// ref: https://docs.cloudbees.com/docs/admin-resources/latest/plugins/docker-workflow
podTemplate(containers: [
    containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.8.8', command: 'cat', ttyEnabled: true),
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
]) {
    node(POD_LABEL) {
        stage('Checkout github branch') {
            // Get some code from a Git repository
            checkout scm
        }

        stage('Build and Push docker image') {
            container('docker') {
                withCredentials([[
                    $class: 'UsernamePasswordMultiBinding',
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_HUB_USER',
                    passwordVariable: 'DOCKER_HUB_PASSWORD'
                ]])  {
                    sh """
                        docker login -u ${DOCKER_HUB_USER} -p ${DOCKER_HUB_PASSWORD}
                        docker build -t ${DOCKER_HUB_REPO}:dev .
                        docker push ${DOCKER_HUB_REPO}:dev
                    """
                }
            }
        }
        stage('Apply kubernetes') {
            container('kubectl') {
                sh """
                    kubectl apply -f ./config/k8s/dev.yaml 
                """
            }
        }
    }
}