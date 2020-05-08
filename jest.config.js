module.exports = {
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  moduleFileExtensions: ['js'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // setupTestFrameworkScriptFileはdeprecated
};
