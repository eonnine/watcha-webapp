def label = 'jenkins-build'
def dockerhubUrl = "jeg910716/watcha-webapp-test"
def credentialId = 'dockerhub'

podTemplate(containers: [
  containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.13.6', command: 'cat', ttyEnabled: true)
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
]) {
  node(label) {
    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */
        checkout scm
    }
    stage('Create Docker images') {
      container('docker') {
        withCredentials('https://registry.hub.docker.com', credentialId) {
          sh """
            docker build -t ${dockerhubUrl}:dev ./
            docker push -t ${dockerhubUrl}:dev
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