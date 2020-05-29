pipeline {
    agent {
        docker {
            image 'node:10.20.1' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh '
                    docker build -t jeg910716/watcha-webapp:dev
                    docker push jeg910716/watcha-webapp:dev
                '
            }
        }
    }
}