podTemplate(containers: [
    containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.13.6', command: 'cat', ttyEnabled: true)
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
]) {
    node {
        def dockerhubUrl = 'jeg910716/watcha-webapp-test'
        def credentialId = 'dockerhub'

        stage('Clone repository') {
            checkout scm
        }
        stage('Create Docker images') {
            container('docker') {
                withCredentials('https://registry.hub.docker.com', "$credentialId") {
                sh """
                    docker build -t $dockerhubUrl:dev ./
                    docker push -t $dockerhubUrl:dev
                    """
                }
            }
        }
        stage('Run kubectl') {
            container('kubectl') {
                sh "kubectl get pods"
            }
        }
    }
}