pipeline {
    agent any

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
                    credentialsId: 'aws-access-key-id', // This ID must match Jenkins
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
                    credentialsId: 'aws-access-key-id',
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
        success { echo 'Deployment successful 🚀' }
        failure { echo 'Pipeline failed ❌' }
    }
}
