// ref: https://docs.cloudbees.com/docs/admin-resources/latest/plugins/docker-workflow
node {
    def customImage

    stage('Checkout') {
        // Get some code from a Git repository
        checkout scm
    }

    stage('Build and Push docker image') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            customImage = docker.build("jeg910716/watcha-webapp:dev-${env.BUILD_NUMBER}")
            // customImage.push()
        }
    }

    stage('Run docker image') {
        customImage.run("-p 3000:3000") 
    }
}