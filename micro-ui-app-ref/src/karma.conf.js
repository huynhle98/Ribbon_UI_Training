module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    files: ['**/*.ts'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
	  require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: false,
        'stop-on-failure': false
      }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml','junit'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_DEBUG,
    browsers: ['Chrome', 'ChromeHeadlessCI', 'FirefoxHeadless'],
    customLaunchers: {
	  FirefoxHeadless: {
	    base: 'Firefox',
	    flags: [ '-headless' ],
	  },
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
    browserNoActivityTimeout: 1200000,
    browserDisconnectTimeout: 20000,
    browserDisconnectTolerance: 3,
    junitReporter: {
            outputDir: 'junit',
            outputFile: 'junit-result.xml',
            suite: 'VNFMUnitTests',
            useBrowserName: true,
            nameFormatter: undefined,
            classNameFormatter: undefined,
            properties: {}
        }
  })
};
