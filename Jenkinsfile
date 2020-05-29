node {
    def customImage

    stage('Checkout github branch') {
        checkout scm
    }

    echo '##docer##'
    stage('Build and Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            customImage = docker.build("jeg910716/watcha-webapp:dev-${env.BUILD_ID}")
            customImage.push()
        }
    }

    echo '##kubectl##'
    stage('Apply Kubernetes files') {
        sh 'kubectl apply -f ./config/k8s/dev.yaml'
    }
}