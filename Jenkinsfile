pipeline {
    agent {
        docker {
            image 'node:10.20.1' 
            args '-p 3000:3000' 
        }
    }
    agent {
        dockerfile {
            filename 'Dockerfile'
            label 'docker-build'
            registryUrl 'jeg910716/watcha-webapp:tagname'
            registryCredentialsId 'dockerhub'
        }
    }
    environment { 
        CI = 'true'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
            }
        }
    }
}