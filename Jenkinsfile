def label = 'jenkin'
def dockerhubUrl = "jeg910716/watcha-webapp-test"
def credentialId = 'dockerhub'


  node(label) {
    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */
        app = checkout scm
    }
    stage('Create Docker images') {
      container('docker') {
        withCredentials('https://registry.hub.docker.com', credentialId) {
          sh """
            docker build -t ${dockerhubUrl}:dev
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