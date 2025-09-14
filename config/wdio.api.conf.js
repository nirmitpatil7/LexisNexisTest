const { config } = require("../wdio.conf.js");

config.specs = [
  "../test/specs/api/**/*.spec.js"
];

config.capabilities = [
  {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
    },
  },
];

// Set baseUrl for the API
config.baseUrl = "https://restful-booker.herokuapp.com";

config.before = function (capabilities, specs) {
  global.expect = require("chai").expect;
  // We won't use browser for API tests, but WebDriverIO still needs it initialized
};

config.afterTest = function (
  test,
  context,
  { error, result, duration, passed, retries }
) {
  // No screenshot needed for API tests
};

exports.config = config;
