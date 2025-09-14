const { config } = require("../wdio.conf.js");

config.specs = ["../test/specs/desktop/**/*.js"];

config.capabilities = [
  {
    maxInstances: 5,
    browserName: "chrome",
    acceptInsecureCerts: true,
    "goog:chromeOptions": {
      args: [
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
        "--window-size=1920,1080",
      ],
    },
  },
];

config.baseUrl = "https://www.cheapflights.com.au";

exports.config = config;
