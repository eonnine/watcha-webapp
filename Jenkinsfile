node {
    checkout scm
    def customImage = docker.build("jeg910716/watcha-webapp:${env.BUILD_ID}")
    customImage.push()
}