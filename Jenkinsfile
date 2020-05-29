node {
    def customImage

    checkout scm
    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
        customImage = docker.build("jeg910716/watcha-webapp:${env.BUILD_ID}")
        customImage.push()
    }
}