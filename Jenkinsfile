node {
    def app

    stage('Checkout') {
        // Get some code from a Git repository
        checkout scm
    }

    stage('Build and Push docker image') {
        app = docker.build("jeg910716/watcha-webapp:dev-${env.BUILD_NUMBER}")
        app.push()
    }
}