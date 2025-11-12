// jest.config.cjs
module.exports = {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.js'],
  transform: {},
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'reports/junit',
      outputName: 'test-results.xml',
      addFileAttribute: 'true'
    }]
  ],
  testMatch: ['**/tests/**/*.spec.js', '**/tests/**/*.test.js']
};
