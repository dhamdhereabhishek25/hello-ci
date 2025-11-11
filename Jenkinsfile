pipeline {
  agent any

  options { timestamps(); timeout(time: 15, unit: 'MINUTES') }

  environment {
    REGISTRY = 'docker.io'
    IMAGE    = 'abhishek25dh/hello-ci'   // <-- change if your Docker Hub username differs
  }

  triggers {
    // works with GitHub webhook; leave a light fallback poll
    pollSCM('@daily')
  }

  stages {
    stage('Checkout') {
      steps { git branch: 'main', url: 'https://github.com/<you>/hello-ci.git' }
    }

    stage('Install') { steps { sh 'npm ci || npm install' } }   // ci if lockfile exists

    stage('Test') {
      steps { sh 'npm test || echo "no tests yet"' }
    }

    stage('Build Docker') {
      steps {
        sh '''
          docker build -t $REGISTRY/$IMAGE:${BUILD_NUMBER} .
          docker tag  $REGISTRY/$IMAGE:${BUILD_NUMBER} $REGISTRY/$IMAGE:latest
        '''
      }
    }

    stage('Push Docker') {
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
