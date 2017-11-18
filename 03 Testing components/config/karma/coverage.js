const base = require('./base');
const webpackConfig = require('../webpack/test/coverage');
const helpers = require('../helpers');

module.exports = (config) => {
  const karmaConfig = Object.assign({}, base, {
    preprocessors: {
      './spec.bundle.js': 'webpack',
    },
    webpack: webpackConfig,
    logLevel: config.LOG_DISABLE,
    reporters: [...base.reporters, 'coverage-istanbul'],
    coverageIstanbulReporter: {
      dir: helpers.resolveFromRootPath('test', 'coverage'),
      reports: ['html', 'text'],
      fixWebpackSourcePaths: true,
    },
  });

  config.set(karmaConfig);
};
