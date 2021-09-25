'use strict';
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
    dest: 'target/screenshots',
    takeScreenshotsOnlyOnFailures: true,
    filename: 'my-report.html'
});

// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:5067/wd/hub/',
    //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json


    chromeDriver: 'C:/mydownloads/chromedriver_win32/chromedriver.exe',

    // Setup the report before any tests start
    beforeLaunch: function() {
        return new Promise(function(resolve){
            reporter.beforeLaunch(resolve);
        });
    },

    multiCapabilities: [
        {
            'browserName': 'chrome',
            'directConnect': 'true',
            'chromeOptions': {
                'args': ['--disable-extensions,--disable-infobars,--disable-plugins,--enable-experimental-extension-apis'],
                'excludeSwitches': ['disable-component-update', 'enable-automation', 'load-extension'],
            }
        }
    ],


    baseUrl:'https://www.coolstuff.se/',
    useAllAngular2AppRoots: true,

    // Spec patterns are relative to the current working directory when
    // protractor is called.
    specs: ['.tmp/e2e/testCases/*.js'],



    framework: 'jasmine2',
    allScriptsTimeout: 110000,
    getPageTimeout: 110000,



    directConnect: true,

    params: {
        errorDetectedInFlow: false
    },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showTiming: true,
        showColors: true,
        isVerbose: true,
        includeStackTrace: false,
        defaultTimeoutInterval: 600000
    },



    onPrepare: function() {
        var SpecReporter = require('jasmine-spec-reporter'); // npm install jasmine-spec-reporter
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
        jasmine.getEnv().addReporter(reporter);
        browser.ignoreSynchronization = true;
        browser.manage().timeouts().implicitlyWait(10000)

    },
    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};
