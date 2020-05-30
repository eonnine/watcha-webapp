// ref: https://docs.cloudbees.com/docs/admin-resources/latest/plugins/docker-workflow
podTemplate(label: POD_LABEL, containers: [
    containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.8.8', command: 'cat', ttyEnabled: true),
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
]) {
    node(POD_LABEL) {
        def customImage

        stage('Checkout github branch') {
            // Get some code from a Git repository
            checkout scm
        }

        stage('Build and Push docker image') {
            container('docker') {
                withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                    sh """
                        docker version
                    """
                }
            }
        }
        stage('Apply kubectl') {
            container('kubectl') {
                sh "kubectl version"
            }
        }
        // stage('Build and Push docker image') {
        //     docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
        //         customImage = docker.build("jeg910716/watcha-webapp:dev")
        //         customImage.push()
        //     }
        // }

        // stage('Apply kubernetes') {
            
        // }
    }
}