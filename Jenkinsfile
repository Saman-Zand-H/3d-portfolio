pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/saman-zand-h/3d-portfolio.git'
        // DOCKERHUB_CREDENTIALS_ID = 'dockerhub-credentials'
        FRONTEND_IMAGE = 'samanzandh/3d-portfolio-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: "${REPO_URL}", branch: 'master'
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}:${env.BUILD_NUMBER}", './frontend')
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS_ID}") {
                        docker.image("${FRONTEND_IMAGE}:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
