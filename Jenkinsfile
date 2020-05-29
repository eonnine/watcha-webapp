pipeline {
    stages {
        def customImage

        stage('Checkout github branch') {
            steps {
                checkout scm
            }
        }

        echo '##docer##'
        stage('Build and Push image') {
            steps{
                docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                    customImage = docker.build("jeg910716/watcha-webapp:dev-${env.BUILD_ID}")
                    customImage.push()
                }
            }
        }

        echo '##kubectl##'
        stage('Apply Kubernetes files') {
            steps{
                withKubeConfig([
                    credentialsId: 'kubernetes',
                    serverUrl: 'https://kubernetes.docker.internal:6443',
                    contextName: 'docker-desktop',
                    clusterName: 'docker-desktop',
                    namespace: 'default'
                ]) {
                    sh 'kubectl get pods'
                }
            }
        }
    }
}