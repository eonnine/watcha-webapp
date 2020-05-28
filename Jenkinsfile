def label = 'watcha-webapp'

podTemplate(label: label, containers: [
    containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl', command: 'cat', ttyEnabled: true)
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
]) {
    echo "first@@@@@@@@@@@@@@"
        echo "first@@@@@@@@@@@@@@end"
        def dockerhubUrl = 'jeg910716/watcha-webapp-test'
        def credentialId = 'dockerhub'
        echo "second@@@@@@@@@@@@@@"

        stage('Clone repository') {
            echo "third@@@@@@@@@@@@@@"
            checkout scm
            echo "third@@@@@@@@@@@@@@end"
        }
        stage('Create Docker images') {
            container('docker') {
                echo "fourth@@@@@@@@@@@@@@"
                withCredentials('https://registry.hub.docker.com', "$credentialId") {
                sh """
                    docker build -t $dockerhubUrl:dev ./
                    docker push -t $dockerhubUrl:dev
                    """
                }
                echo "fourth@@@@@@@@@@@@@@end"
            }
        }
        stage('Run kubectl') {
            container('kubectl') {
                sh "kubectl get pods"
            }
        }
}