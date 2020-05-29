node('docker') {
    def customImage

    stage('Checkout github branch') {
        checkout scm
    }

    stage('Build and Push docker image') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            customImage = docker.build("jeg910716/watcha-webapp:dev-${env.BUILD_ID}")
            customImage.push()
        }
    }
}