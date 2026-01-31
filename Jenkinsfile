pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '612931695482'           // Replace with your actual AWS account number
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
                // Build backend using Maven + Java 17
                docker { image 'maven:3.9.6-eclipse-temurin-17' }
            }
            steps {
                sh '''
                    java -version
                    cd backend
                    chmod +x mvnw
                    ./mvnw -version
                    ./mvnw -B -DskipTests package
                '''
            }
            post {
                failure { echo 'Backend build failed' }
            }
        }

        stage('Frontend: Build') {
            steps {
                sh '''
                    cd frontend
                    npm ci
                    npm run build
                '''
            }
            post {
                failure { echo 'Frontend build failed' }
            }
        }

        stage('ECR Login') {
            steps {
                // Inject AWS credentials for all AWS CLI commands
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-access-key-id'   // This must match the ID you set in Jenkins
                ]]) {
                    sh '''
                        aws --version || true
                        aws ecr get-login-password --region $AWS_DEFAULT_REGION | \
                            docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
                    '''
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    script {
                        def registry = "${env.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_DEFAULT_REGION}.amazonaws.com"
                        def backendTag = "${registry}/${env.BACKEND_REPO}:${env.BUILD_NUMBER}"
                        def frontendTag = "${registry}/${env.FRONTEND_REPO}:${env.BUILD_NUMBER}"

                        sh """
                            # Create ECR repos if they do not exist
                            aws ecr describe-repositories --repository-names $BACKEND_REPO || \
                                aws ecr create-repository --repository-name $BACKEND_REPO
                            aws ecr describe-repositories --repository-names $FRONTEND_REPO || \
                                aws ecr create-repository --repository-name $FRONTEND_REPO

                            # Backend Docker build & push
                            docker build -t ${backendTag} -f backend/Dockerfile backend
                            docker push ${backendTag}
                            docker tag ${backendTag} ${registry}/$BACKEND_REPO:latest
                            docker push ${registry}/$BACKEND_REPO:latest

                            # Frontend Docker build & push (production)
                            docker build --build-arg VITE_APP_BACKEND_ADDRESS=/api -t ${frontendTag} -f frontend/Dockerfile.prod frontend
                            docker push ${frontendTag}
                            docker tag ${frontendTag} ${registry}/$FRONTEND_REPO:latest
                            docker push ${registry}/$FRONTEND_REPO:latest
                        """

                        // Save image tags for deployment
                        env.BACKEND_IMAGE = "${registry}/${env.BACKEND_REPO}:latest"
                        env.FRONTEND_IMAGE = "${registry}/${env.FRONTEND_REPO}:latest"
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
        success { echo 'Deployment successful' }
        failure { echo 'Pipeline failed' }
    }
}
