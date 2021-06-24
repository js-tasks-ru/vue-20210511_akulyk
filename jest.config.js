const config = {
  preset: '@vue/cli-plugin-unit-jest',
  rootDir: '.',
  modulePaths: ['utility_modules'],
  testMatch: ['**/__tests__/**/*.(spec|test|student-test).[jt]s?(x)'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
};

if (process.env.TASK_MONITOR) {
  Object.assign(config, {
    testResultsProcessor: './utility_modules/taskbook-test-results-processor.js',
    reporters: [],
  });
}

module.exports = config;
