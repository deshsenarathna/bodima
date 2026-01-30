pipeline {
  agent any

  environment {
    AWS_DEFAULT_REGION = 'ap-south-1'
    BACKEND_REPO = 'bodima-backend'
    FRONTEND_REPO = 'bodima-frontend'
    // Jenkins Credentials: create these IDs in Jenkins and store values securely
    AWS_ACCOUNT_ID = credentials('aws-account-id')
    AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Backend: Build') {
      agent {
        // Build backend with Maven + JDK 17 to satisfy java.version=17
        docker { image 'maven:3.9.6-eclipse-temurin-17' }
      }
      steps {
        sh 'java -version && cd backend && chmod +x mvnw && ./mvnw -version && ./mvnw -B -DskipTests package'
      }
      post {
        failure { echo 'Backend build failed' }
      }
    }

    stage('Frontend: Build') {
      steps {
        sh 'cd frontend && npm ci && npm run build'
      }
      post {
        failure { echo 'Frontend build failed' }
      }
    }

    stage('ECR Login') {
      steps {
        sh 'aws --version || true'
        sh 'aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com'
      }
    }

    stage('Docker Build & Push') {
      steps {
        script {
          def registry = "${env.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_DEFAULT_REGION}.amazonaws.com"
          def backendTag = "${registry}/${env.BACKEND_REPO}:${env.BUILD_NUMBER}"
          def frontendTag = "${registry}/${env.FRONTEND_REPO}:${env.BUILD_NUMBER}"

          sh """
            # Create repos if missing
            aws ecr describe-repositories --repository-names $BACKEND_REPO || aws ecr create-repository --repository-name $BACKEND_REPO
            aws ecr describe-repositories --repository-names $FRONTEND_REPO || aws ecr create-repository --repository-name $FRONTEND_REPO

            # Backend
            docker build -t ${backendTag} -f backend/Dockerfile backend
            docker push ${backendTag}
            docker tag ${backendTag} ${registry}/$BACKEND_REPO:latest
            docker push ${registry}/$BACKEND_REPO:latest

            # Frontend (prod)
            docker build --build-arg VITE_APP_BACKEND_ADDRESS=/api -t ${frontendTag} -f frontend/Dockerfile.prod frontend
            docker push ${frontendTag}
            docker tag ${frontendTag} ${registry}/$FRONTEND_REPO:latest
            docker push ${registry}/$FRONTEND_REPO:latest
          """

          // Save tags for deploy
          env.BACKEND_IMAGE = "${registry}/${env.BACKEND_REPO}:latest"
          env.FRONTEND_IMAGE = "${registry}/${env.FRONTEND_REPO}:latest"
        }
      }
    }

    stage('Deploy with Ansible') {
      steps {
        sh """
          cd ansible
          ansible-playbook -i inventory.ini playbook.yml \
            -e backend_image=$BACKEND_IMAGE \
            -e frontend_image=$FRONTEND_IMAGE
        """
      }
    }
  }

  post {
    success { echo 'Deployment successful' }
    failure { echo 'Pipeline failed' }
  }
}
