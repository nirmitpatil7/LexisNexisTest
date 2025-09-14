const { config } = require("../wdio.conf.js");

config.specs = ["./test/specs/mobile/**/*.js"];

config.capabilities = [
  {
    // Chrome mobile emulation
    maxInstances: 1,
    browserName: "chrome",
    acceptInsecureCerts: true,
    "goog:chromeOptions": {
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
      ],
      mobileEmulation: {
        deviceName: "iPhone 12 Pro",
      },
    },
  },
];

config.services = [];

config.port = undefined;
config.path = undefined;

config.waitforTimeout = 15000;
config.connectionRetryTimeout = 120000;

// Set base URL for IDverse staging environment
config.baseUrl = "https://tptestnone.au.staging-idkit.com";

// Mobile web specific hooks
config.beforeSession = function (config, capabilities, specs) {
  console.log("Starting mobile web session...");
};

config.before = function (capabilities, specs) {
  global.expect = require("chai").expect;

  // Mobile web specific global helpers
  global.findByText = async function (text, timeout = 10000) {
    const selector = `//*[contains(text(), "${text}")]`;
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  };

  global.findByPartialText = async function (text, timeout = 10000) {
    const selector = `//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), "${text.toLowerCase()}")]`;
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  };

  global.findByAriaLabel = async function (label, timeout = 10000) {
    const selector = `[aria-label*="${label}"]`;
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  };

  global.findByPlaceholder = async function (placeholder, timeout = 10000) {
    const selector = `[placeholder*="${placeholder}"]`;
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  };

  global.typeTextSafely = async function (element, text) {
    await element.waitForClickable();
    await element.click();
    await element.clearValue();
    await browser.pause(500);
    await element.setValue(text);
    await browser.pause(500);
  };

  global.scrollToElement = async function (element) {
    await element.scrollIntoView();
    await browser.pause(500);
  };

  global.scrollToText = async function (text) {
    const element = await findByText(text);
    await scrollToElement(element);
    return element;
  };

  global.waitForTextToAppear = async function (text, timeout = 15000) {
    const selector = `//*[contains(text(), "${text}")]`;
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  };

  global.clickByText = async function (text) {
    const element = await findByText(text);
    await element.waitForClickable();
    await element.click();
  };

  global.isElementVisible = async function (selector) {
    try {
      const element = await $(selector);
      return await element.isDisplayed();
    } catch (e) {
      return false;
    }
  };

  global.waitForPageLoad = async function () {
    await browser.waitUntil(
      () => browser.execute(() => document.readyState === "complete"),
      {
        timeout: 10000,
        timeoutMsg: "Page did not load completely",
      }
    );
  };

  // Mobile specific actions
  global.swipeUp = async function () {
    const { width, height } = await browser.getWindowSize();
    await browser.touchAction([
      { action: "press", x: width / 2, y: height * 0.8 },
      { action: "moveTo", x: width / 2, y: height * 0.2 },
      "release",
    ]);
  };

  global.swipeDown = async function () {
    const { width, height } = await browser.getWindowSize();
    await browser.touchAction([
      { action: "press", x: width / 2, y: height * 0.2 },
      { action: "moveTo", x: width / 2, y: height * 0.8 },
      "release",
    ]);
  };
};

config.afterTest = function (
  test,
  context,
  { error, result, duration, passed, retries }
) {
  if (!passed) {
    browser.takeScreenshot();
  }
};

exports.config = config;
