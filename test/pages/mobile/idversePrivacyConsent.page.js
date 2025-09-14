class IdversePrivacyConsentPage {
  constructor() {
    this.selectors = {
      // IDverse logo
      idverseLogo: 'img[alt*="IDverse"], img[src*="idverse"], [class*="logo"]',

      // Privacy consent elements
      privacyConsentHeading: '//*[contains(text(), "Privacy Consent")]',
      consentCheckbox: 'input[type="checkbox"], [role="checkbox"]',
      consentText:
        '//*[contains(text(), "I have read this notice and I provide my consent")]',

      // Continue button
      continueButton:
        'button*=Continue, input[value*="Continue"], [data-testid*="continue"]',

      // Privacy policy link
      privacyPolicyLink: 'a*=privacy policy, [href*="privacy"]',

      // Privacy notice content
      privacyNoticeContent:
        '//*[contains(text(), "To verify your identity we capture")]',
      idversePartnerText: '//*[contains(text(), "Our partner IDVerse")]',
      biometricDataText: '//*[contains(text(), "facial biometrics")]',
      sevenDaysText: '//*[contains(text(), "seven days")]',
    };
  }

  // Check if IDverse logo is visible
  async isIdverseLogoVisible() {
    try {
      // Try multiple strategies to find the logo
      const logoSelectors = [
        'img[alt*="IDverse"]',
        'img[src*="idverse"]',
        '[class*="logo"]',
        'img[alt*="idverse"]',
      ];

      for (const selector of logoSelectors) {
        try {
          const logo = await $(selector);
          if (await logo.isDisplayed()) {
            console.log(`IDverse logo found using selector: ${selector}`);
            return true;
          }
        } catch (e) {
          continue;
        }
      }

      // Try to find by text content nearby
      try {
        const idverseText = await findByText("IDverse");
        if (await idverseText.isDisplayed()) {
          console.log("IDverse text/logo found");
          return true;
        }
      } catch (e) {
        console.log("IDverse logo not found by text");
      }

      return false;
    } catch (error) {
      console.log(`Error checking IDverse logo visibility: ${error.message}`);
      return false;
    }
  }

  // Check if privacy consent content is visible
  async isPrivacyConsentVisible() {
    try {
      const privacyTexts = [
        "Privacy Consent",
        "To verify your identity we capture",
        "personal data from your ID docs",
        "Our partner IDVerse",
      ];

      let foundTexts = 0;

      for (const text of privacyTexts) {
        try {
          const element = await findByPartialText(text);
          if (await element.isDisplayed()) {
            console.log(`Found privacy text: ${text}`);
            foundTexts++;
          }
        } catch (e) {
          console.log(`Privacy text not found: ${text}`);
        }
      }

      // Consider privacy content visible if we found at least 2 key texts
      return foundTexts >= 2;
    } catch (error) {
      console.log(
        `Error checking privacy consent visibility: ${error.message}`
      );
      return false;
    }
  }

  // Click the consent checkbox using text-based approach
  async clickConsentCheckbox() {
    try {
      // Strategy 1: Find checkbox by the consent text
      try {
        const consentText = await findByPartialText(
          "I have read this notice and I provide my consent"
        );

        // Look for checkbox near the consent text
        const parentElement = await consentText.$("..");
        const checkbox = await parentElement.$('input[type="checkbox"]');

        if (await checkbox.isDisplayed()) {
          await checkbox.click();
          console.log("Consent checkbox clicked via text association");
          await browser.pause(500);
          return true;
        }
      } catch (e) {
        console.log("Checkbox not found via text association");
      }

      // Strategy 2: Find any visible checkbox on the page
      try {
        const checkboxes = await $$('input[type="checkbox"]');
        for (const checkbox of checkboxes) {
          if (await checkbox.isDisplayed()) {
            await checkbox.click();
            console.log("Consent checkbox clicked (first visible checkbox)");
            await browser.pause(500);
            return true;
          }
        }
      } catch (e) {
        console.log("No visible checkboxes found");
      }

      // Strategy 3: Look for role="checkbox"
      try {
        const roleCheckbox = await $('[role="checkbox"]');
        if (await roleCheckbox.isDisplayed()) {
          await roleCheckbox.click();
          console.log("Consent checkbox clicked via role attribute");
          await browser.pause(500);
          return true;
        }
      } catch (e) {
        console.log("No role=checkbox found");
      }

      // Strategy 4: Click on the consent text itself (might be clickable)
      try {
        const consentText = await findByPartialText("I have read this notice");
        await consentText.click();
        console.log("Clicked on consent text directly");
        await browser.pause(500);
        return true;
      } catch (e) {
        console.log("Consent text not clickable");
      }

      throw new Error("Could not find or click consent checkbox");
    } catch (error) {
      throw new Error(`Failed to click consent checkbox: ${error.message}`);
    }
  }

  // Click the Continue button using text-based approach
  async clickContinueButton() {
    try {
      // Strategy 1: Find by text "Continue"
      try {
        await clickByText("Continue");
        console.log("Continue button clicked via text");
        await browser.pause(1000);
        return true;
      } catch (e) {
        console.log("Continue button not found by text");
      }

      // Strategy 2: Find button with value "Continue"
      try {
        const continueButton = await $('input[value*="Continue"]');
        if (await continueButton.isDisplayed()) {
          await continueButton.click();
          console.log("Continue button clicked via input value");
          await browser.pause(1000);
          return true;
        }
      } catch (e) {
        console.log("Continue button not found by input value");
      }

      // Strategy 3: Find by data-testid or similar attributes
      try {
        const testIdButton = await $(
          '[data-testid*="continue"], [data-test*="continue"]'
        );
        if (await testIdButton.isDisplayed()) {
          await testIdButton.click();
          console.log("Continue button clicked via test ID");
          await browser.pause(1000);
          return true;
        }
      } catch (e) {
        console.log("Continue button not found by test ID");
      }

      // Strategy 4: Find submit button (might be styled as Continue)
      try {
        const submitButton = await $(
          'button[type="submit"], input[type="submit"]'
        );
        if (await submitButton.isDisplayed()) {
          await submitButton.click();
          console.log("Continue button clicked via submit type");
          await browser.pause(1000);
          return true;
        }
      } catch (e) {
        console.log("No submit button found");
      }

      throw new Error("Could not find Continue button");
    } catch (error) {
      throw new Error(`Failed to click Continue button: ${error.message}`);
    }
  }

  // Check if consent checkbox is checked
  async isConsentCheckboxChecked() {
    try {
      const checkboxes = await $$('input[type="checkbox"]');
      for (const checkbox of checkboxes) {
        if (await checkbox.isDisplayed()) {
          const isChecked = await checkbox.isSelected();
          console.log(`Checkbox checked status: ${isChecked}`);
          return isChecked;
        }
      }
      return false;
    } catch (error) {
      console.log(`Error checking checkbox status: ${error.message}`);
      return false;
    }
  }

  // Complete the privacy consent flow
  async completePrivacyConsent() {
    // Wait for page to load
    await waitForPageLoad();

    // Check logo visibility
    const logoVisible = await this.isIdverseLogoVisible();
    console.log(`IDverse logo visible: ${logoVisible}`);

    // Check privacy content visibility
    const privacyVisible = await this.isPrivacyConsentVisible();
    console.log(`Privacy consent content visible: ${privacyVisible}`);

    // Click consent checkbox
    await this.clickConsentCheckbox();

    // Verify checkbox is checked
    const isChecked = await this.isConsentCheckboxChecked();
    console.log(`Consent checkbox is checked: ${isChecked}`);

    // Click continue button
    await this.clickContinueButton();

    return {
      logoVisible,
      privacyVisible,
      consentClicked: true,
      isChecked,
      continueClicked: true,
    };
  }

  // Wait for the privacy consent page to load
  async waitForPrivacyConsentPage() {
    try {
      await waitForTextToAppear("Privacy Consent", 15000);
      await browser.pause(1000);
      console.log("Privacy Consent page loaded");
    } catch (error) {
      console.log(
        "Privacy Consent page may not have loaded or uses different text"
      );
    }
  }

  // Verify all required elements are present
  async verifyPageElements() {
    const results = {
      logoVisible: await this.isIdverseLogoVisible(),
      privacyConsentVisible: await this.isPrivacyConsentVisible(),
      checkboxPresent: false,
      continueButtonPresent: false,
    };

    // Check if checkbox is present
    try {
      const checkbox = await $('input[type="checkbox"]');
      results.checkboxPresent = await checkbox.isDisplayed();
    } catch (e) {
      results.checkboxPresent = false;
    }

    // Check if continue button is present
    try {
      await findByText("Continue");
      results.continueButtonPresent = true;
    } catch (e) {
      results.continueButtonPresent = false;
    }

    return results;
  }
}

module.exports = new IdversePrivacyConsentPage();
