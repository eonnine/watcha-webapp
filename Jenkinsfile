def label = 'watcha-webapp'


    echo "first@@@@@@@@@@@@@@"
    node(label) {
        echo "first@@@@@@@@@@@@@@end"
        def dockerhubUrl = 'jeg910716/watcha-webapp-test'
        def credentialDockerId = 'docker'
        def credentialGithubId = 'github'
        echo "second@@@@@@@@@@@@@@"

        stage('Clone repository') {
            container('git') {
                // https://gitlab.com/gitlab-org/gitlab-foss/issues/38910
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/master']],
                    userRemoteConfigs: [
                        [url: 'https://github.com/eonnine/watcha-webapp.git', credentialsId: "$credentialGithubId"]
                    ],
                ])
            }
        }
    }
