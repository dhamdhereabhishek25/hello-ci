pipeline {
  agent none
  options { timestamps(); timeout(time: 15, unit: 'MINUTES') }

  environment {
    REGISTRY = 'docker.io'
    IMAGE    = 'abhishek25dh/hello-ci'   // <-- change to your Docker Hub username/repo if different
  }

  stages {
    stage('Checkout') {
      agent any
      steps { checkout scm }
    }
     stage('Install & Test') {
         agent {
             docker {
               image 'node:20-alpine'
               args '-u root:root'
                reuseNode true
    }
  }
                steps {
                          sh 'node -v && npm -v'
                           sh 'npm ci || npm install'
                            sh 'npm test'
  }
  post {
    always {
      junit allowEmptyResults: true, testResults: 'reports/junit/*.xml'
      archiveArtifacts artifacts: 'reports/junit/*.xml', allowEmptyArchive: true
    }
  }
}


    stage('Build Docker') {
      agent any
      steps {
        sh '''
          docker build -t $REGISTRY/$IMAGE:${BUILD_NUMBER} .
          docker tag  $REGISTRY/$IMAGE:${BUILD_NUMBER} $REGISTRY/$IMAGE:latest
        '''
      }
    }

    stage('Push Docker') {
      agent any
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                          usernameVariable: 'DOCKER_USER',
                                          passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin $REGISTRY
            docker push $REGISTRY/$IMAGE:${BUILD_NUMBER}
            docker push $REGISTRY/$IMAGE:latest
            docker logout $REGISTRY || true
          '''
        }
      }
    }

    stage('Deploy (local host)') {
      agent any
      steps {
        sh '''
          docker compose -f docker-compose.prod.yml pull
          docker compose -f docker-compose.prod.yml up -d
        '''
      }
    }
  }

  post {
    success { echo "✅ Deployed: $REGISTRY/$IMAGE:latest" }
    failure { echo "❌ Pipeline failed" }
  }
}
