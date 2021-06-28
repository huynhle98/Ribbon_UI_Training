module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
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
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: ['Chrome'],
      customLaunchers: {
       FirefoxHeadless: {
       base: 'Firefox',
       flags: [ '-headless' ],
       },
       ChromeHeadless: {
       base: 'Chrome',
       flags: [
            '--no-sandbox',
            '--disable-translate',
            '--headless',
            '--disable-gpu',
            '--disable-extensions',
            '--remote-debugging-port=9222'
          ]
        } 
      },
      singleRun: true,
      browserNoActivityTimeout: 60000,
      browserDisconnectTimeout: 10000,
      browserDisconnectTolerance: 3,
      junitReporter: {
          outputDir: 'junit', // results will be saved as $outputDir/$browserName.xml
          outputFile: 'junit-result.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
          suite: 'VNFMUnitTests', // suite will become the package name attribute in xml testsuite element
          useBrowserName: true, // add browser name to report and classes names
          nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
          classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
          properties: {} // key value pair of properties to add to the <properties> section of the report
          }
    });
  };
 