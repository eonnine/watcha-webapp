podTemplate(yaml: """
apiVersion: apps/v1
kind: Deployment
metadata:
  name: watcha-webapp-dev
spec:
  selector:
    matchLabels:
      run: watcha-webapp
  replicas: 1
  strategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        run: watcha-webapp
    spec:
      containers:
      - name: watcha-webapp
        image: jeg910716/watcha-webapp:dev
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: watcha-webapp-dev
  labels:
    run: watcha-webapp
spec:
  selector:
    # deployment의 template name을 가르킵니다.
    run: watcha-webapp
  ports:
  - port: 3000
    targetPort: 3000
    protocol: TCP
  type: LoadBalancer
"""
) {
    node('watcha-webapp-dev') {
        def customImage

        stage('Checkout github branch') {
            checkout scm
        }

        stage('Build and Push docker image') {
            docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                customImage = docker.build("jeg910716/watcha-webapp:dev-${env.BUILD_ID}")
                customImage.push()
            }
        }

        stage('Apply kubernetes') {
            withKubeConfig([
                credentialsId: 'kubernetes',
                serverUrl: 'https://kubernetes.docker.internal:6443',
                contextName: 'docker-desktop',
                clusterName: 'docker-desktop',
                namespace: 'default'
            ]) {
                sh 'kubectl get pods'
            }
        }
    }
}