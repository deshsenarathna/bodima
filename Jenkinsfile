pipeline {
    agent any

    triggers {
    githubPush()
}


    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '612931695482'
        BACKEND_REPO = 'bodima-backend'
        FRONTEND_REPO = 'bodima-frontend'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend: Build') {
    agent {
        docker {
            image 'maven:3.9.6-eclipse-temurin-17'
            args '--entrypoint="" --memory=4g -v $WORKSPACE:/app -w /app'
        }
    }
    environment {
        MAVEN_CONFIG = "${WORKSPACE}/.m2"
    }
    steps {
        sh '''
            echo "Starting backend build inside Maven container"
            java -version
            mkdir -p "$MAVEN_CONFIG/repository"
            chmod -R 777 "$MAVEN_CONFIG"
            cd backend
            mvn -B -DskipTests clean package
        '''
    }
    post {
        failure { echo 'Backend build failed' }
    }
}


        stage('Frontend: Build') {
    agent {
        docker {
            image 'node:20-alpine'
            args '--entrypoint="" --memory=8g' // increased memory
        }
    }
    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }
    steps {
        sh '''
            set -e  # fail immediately on error
            mkdir -p $NPM_CONFIG_CACHE
            cd frontend

            echo "Installing npm packages..."
            npm install --legacy-peer-deps

            echo "Running frontend build with verbose logging..."
            npm run build -- --debug
        '''
    }
    post {
        failure { echo 'Frontend build failed ❌' }
    }
}







stage('ECR Login') {
            steps {
                // Map the AWS Credential object to the standard AWS environment variables
                withCredentials([[ 
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials', // This ID must match Jenkins
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh '''
                        aws ecr get-login-password --region $AWS_DEFAULT_REGION | \
                        docker login --username AWS --password-stdin \
                        $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
                    '''
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([[ 
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    script {
                        def registry = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"

                        sh """
                            # Ensure repositories exist
                            aws ecr describe-repositories --repository-names $BACKEND_REPO --region $AWS_DEFAULT_REGION || \
                            aws ecr create-repository --repository-name $BACKEND_REPO --region $AWS_DEFAULT_REGION

                            aws ecr describe-repositories --repository-names $FRONTEND_REPO --region $AWS_DEFAULT_REGION || \
                            aws ecr create-repository --repository-name $FRONTEND_REPO --region $AWS_DEFAULT_REGION

                            # Build and Push Backend
                            docker build -t $registry/$BACKEND_REPO:latest backend
                            docker push $registry/$BACKEND_REPO:latest

                            # Build and Push Frontend
                            docker build -t $registry/$FRONTEND_REPO:latest -f frontend/Dockerfile.prod frontend
                            docker push $registry/$FRONTEND_REPO:latest
                        """

                        env.BACKEND_IMAGE = "$registry/$BACKEND_REPO:latest"
                        env.FRONTEND_IMAGE = "$registry/$FRONTEND_REPO:latest"
                    }
                }
            }
        }

     stage('Deploy to EC2') {
  steps {
    sshagent(credentials: ['ec2-ssh-key']) {
      sh """
        ssh -o StrictHostKeyChecking=no ec2-user@15.206.167.74 '
          set -e
          REG=612931695482.dkr.ecr.ap-south-1.amazonaws.com

          echo "Logging into ECR..."
          aws ecr get-login-password --region ap-south-1 | \
          docker login --username AWS --password-stdin \$REG

          echo "Creating Docker network if not exists..."
          docker network inspect bodima-net >/dev/null 2>&1 || docker network create bodima-net

          echo "Pulling latest images..."
          docker pull \$REG/bodima-backend:latest
          docker pull \$REG/bodima-frontend:latest

          echo "Stopping old containers..."
          docker rm -f bodima-frontend bodima-backend || true

          echo "Starting backend..."
          docker run -d --name bodima-backend \
            --network bodima-net \
            --network-alias backend \
            --restart unless-stopped \
            -p 9090:9090 \
            -e SPRING_DATASOURCE_URL="jdbc:mysql://bodima-db.c1wa8008eb0x.ap-south-1.rds.amazonaws.com:3306/bodima" \
            -e SPRING_DATASOURCE_USERNAME="admin" \
            -e SPRING_DATASOURCE_PASSWORD="Admin200142" \
            \$REG/bodima-backend:latest

          echo "Starting frontend..."
          docker run -d --name bodima-frontend \
            --network bodima-net \
            --restart unless-stopped \
            -p 80:80 \
            \$REG/bodima-frontend:latest

          echo "Deployment completed successfully 🚀"
        '
      """
    }
  }
}

    }

    post {
        success { echo 'Deployment successful 🚀' }
        failure { echo 'Pipeline failed ❌' }
    }
}
