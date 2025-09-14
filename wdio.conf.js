const path = require("path");

exports.config = {
  runner: "local",

  specs: ["./test/specs/**/*.js"],

  exclude: [],

  maxInstances: 10,

  capabilities: [
    {
      maxInstances: 5,
      browserName: "chrome",
      acceptInsecureCerts: true,
      "goog:chromeOptions": {
        args: [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-web-security",
        ],
      },
    },
  ],

  logLevel: "info",

  bail: 0,

  baseUrl: "http://localhost",

  waitforTimeout: 10000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  services: [],

  framework: "mocha",

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "reports/allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  // Add debug options
  debug: true,
  execArgv: ["--inspect"],

  before: function (capabilities, specs) {
    global.expect = require("chai").expect;
  },

  afterTest: function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (!passed) {
      browser.takeScreenshot();
    }
  },
};
