class IdverseCapturePhotoIdPage {
  constructor() {
    this.selectors = {
      // Page heading
      capturePhotoIdHeading: '//*[contains(text(), "Capture your Photo ID")]',

      // Back button
      backButton: 'button*=Back, a*=Back, [data-testid*="back"]',

      // Capture ID button
      captureIdButton:
        'button*=Capture my ID, input[value*="Capture my ID"], [data-testid*="capture"]',

      // Additional elements for context
      instructionText:
        '//*[contains(text(), "Take a photo of your Driver Licence")]',
      seeAcceptableDocuments:
        '//*[contains(text(), "See acceptable documents")]',
      idverseLogoOnThisPage:
        'img[alt*="IDverse"], img[src*="idverse"], [class*="logo"]',
    };
  }

  // Check if "Capture your Photo ID" heading is visible
  async isCapturePhotoIdHeadingVisible() {
    try {
      const headingTexts = [
        "Capture your Photo ID",
        "Capture Photo ID",
        "Photo ID",
      ];

      for (const text of headingTexts) {
        try {
          const heading = await findByText(text);
          if (await heading.isDisplayed()) {
            console.log(`Found heading: ${text}`);
            return true;
          }
        } catch (e) {
          console.log(`Heading text "${text}" not found`);
        }
      }

      return false;
    } catch (error) {
      console.log(`Error checking heading visibility: ${error.message}`);
      return false;
    }
  }

  // Check if Back button is visible
  async isBackButtonVisible() {
    try {
      // Strategy 1: Find by text "Back"
      try {
        const backButton = await findByText("Back");
        if (await backButton.isDisplayed()) {
          console.log("Back button found by text");
          return true;
        }
      } catch (e) {
        console.log("Back button not found by text");
      }

      // Strategy 2: Find by button element with Back text
      try {
        const backButton = await $("button*=Back");
        if (await backButton.isDisplayed()) {
          console.log("Back button found by button selector");
          return true;
        }
      } catch (e) {
        console.log("Back button not found by button selector");
      }

      // Strategy 3: Find by link with Back text
      try {
        const backLink = await $("a*=Back");
        if (await backLink.isDisplayed()) {
          console.log("Back button found by link selector");
          return true;
        }
      } catch (e) {
        console.log("Back button not found by link selector");
      }

      // Strategy 4: Look for arrow or back navigation elements
      try {
        const backArrow = await $(
          '[class*="back"], [data-testid*="back"], [aria-label*="back"]'
        );
        if (await backArrow.isDisplayed()) {
          console.log("Back button found by attribute selector");
          return true;
        }
      } catch (e) {
        console.log("Back button not found by attribute selector");
      }

      return false;
    } catch (error) {
      console.log(`Error checking Back button visibility: ${error.message}`);
      return false;
    }
  }

  // Check if "Capture my ID" button is visible
  async isCaptureIdButtonVisible() {
    try {
      // Strategy 1: Find by exact text "Capture my ID"
      try {
        const captureButton = await findByText("Capture my ID");
        if (await captureButton.isDisplayed()) {
          console.log("Capture ID button found by exact text");
          return true;
        }
      } catch (e) {
        console.log("Capture ID button not found by exact text");
      }

      // Strategy 2: Find by partial text containing "Capture"
      try {
        const captureButton = await findByPartialText("Capture");
        if (await captureButton.isDisplayed()) {
          const buttonText = await captureButton.getText();
          if (
            buttonText.toLowerCase().includes("capture") &&
            buttonText.toLowerCase().includes("id")
          ) {
            console.log(
              `Capture ID button found by partial text: ${buttonText}`
            );
            return true;
          }
        }
      } catch (e) {
        console.log("Capture ID button not found by partial text");
      }

      // Strategy 3: Find by button element with Capture text
      try {
        const captureButton = await $("button*=Capture");
        if (await captureButton.isDisplayed()) {
          console.log("Capture ID button found by button selector");
          return true;
        }
      } catch (e) {
        console.log("Capture ID button not found by button selector");
      }

      // Strategy 4: Find by input value
      try {
        const captureInput = await $('input[value*="Capture"]');
        if (await captureInput.isDisplayed()) {
          console.log("Capture ID button found by input value");
          return true;
        }
      } catch (e) {
        console.log("Capture ID button not found by input value");
      }

      // Strategy 5: Find by data attributes
      try {
        const captureButton = await $(
          '[data-testid*="capture"], [data-test*="capture"], [id*="capture"]'
        );
        if (await captureButton.isDisplayed()) {
          console.log("Capture ID button found by data attributes");
          return true;
        }
      } catch (e) {
        console.log("Capture ID button not found by data attributes");
      }

      return false;
    } catch (error) {
      console.log(
        `Error checking Capture ID button visibility: ${error.message}`
      );
      return false;
    }
  }

  // Check if instruction text is visible
  async isInstructionTextVisible() {
    try {
      const instructionTexts = [
        "Take a photo of your Driver Licence",
        "Take a photo of your",
        "Driver Licence",
        "Proof of Age card",
        "Passport",
      ];

      let foundTexts = 0;

      for (const text of instructionTexts) {
        try {
          const element = await findByPartialText(text);
          if (await element.isDisplayed()) {
            console.log(`Found instruction text: ${text}`);
            foundTexts++;
          }
        } catch (e) {
          console.log(`Instruction text not found: ${text}`);
        }
      }

      return foundTexts >= 1;
    } catch (error) {
      console.log(
        `Error checking instruction text visibility: ${error.message}`
      );
      return false;
    }
  }

  // Check if "See acceptable documents" link is visible
  async isSeeAcceptableDocumentsVisible() {
    try {
      const documentsTexts = [
        "See acceptable documents",
        "acceptable documents",
        "documents",
      ];

      for (const text of documentsTexts) {
        try {
          const element = await findByPartialText(text);
          if (await element.isDisplayed()) {
            console.log(`Found documents text: ${text}`);
            return true;
          }
        } catch (e) {
          console.log(`Documents text not found: ${text}`);
        }
      }

      return false;
    } catch (error) {
      console.log(`Error checking documents link visibility: ${error.message}`);
      return false;
    }
  }

  // Verify all required elements are present on the page
  async verifyPageElements() {
    const results = {
      headingVisible: await this.isCapturePhotoIdHeadingVisible(),
      backButtonVisible: await this.isBackButtonVisible(),
      captureIdButtonVisible: await this.isCaptureIdButtonVisible(),
      instructionTextVisible: await this.isInstructionTextVisible(),
      documentsLinkVisible: await this.isSeeAcceptableDocumentsVisible(),
    };

    console.log("Page elements verification results:", results);
    return results;
  }

  // Wait for the capture photo ID page to load
  async waitForCapturePhotoIdPage() {
    try {
      await waitForTextToAppear("Capture your Photo ID", 15000);
      await browser.pause(1000);
      console.log("Capture Photo ID page loaded");
    } catch (error) {
      console.log(
        "Capture Photo ID page may not have loaded or uses different text"
      );
      // Try alternative text
      try {
        await waitForTextToAppear("Photo ID", 5000);
        console.log("Photo ID page loaded (alternative text)");
      } catch (e) {
        console.log("Page load verification completed with warnings");
      }
    }
  }

  // Click the Back button (for navigation testing)
  async clickBackButton() {
    try {
      // Try clicking by text first
      try {
        await clickByText("Back");
        console.log("Back button clicked via text");
        await browser.pause(1000);
        return true;
      } catch (e) {
        console.log("Back button not clickable by text");
      }

      // Try clicking by button selector
      try {
        const backButton = await $("button*=Back");
        await backButton.click();
        console.log("Back button clicked via button selector");
        await browser.pause(1000);
        return true;
      } catch (e) {
        console.log("Back button not clickable by button selector");
      }

      throw new Error("Could not click Back button");
    } catch (error) {
      throw new Error(`Failed to click Back button: ${error.message}`);
    }
  }

  // Click the Capture my ID button (for future use)
  async clickCaptureIdButton() {
    try {
      // Try clicking by text first
      try {
        await clickByText("Capture my ID");
        console.log("Capture ID button clicked via text");
        await browser.pause(1000);
        return true;
      } catch (e) {
        console.log("Capture ID button not clickable by text");
      }

      // Try clicking by button selector
      try {
        const captureButton = await $("button*=Capture");
        await captureButton.click();
        console.log("Capture ID button clicked via button selector");
        await browser.pause(1000);
        return true;
      } catch (e) {
        console.log("Capture ID button not clickable by button selector");
      }

      throw new Error("Could not click Capture ID button");
    } catch (error) {
      throw new Error(`Failed to click Capture ID button: ${error.message}`);
    }
  }
}

module.exports = new IdverseCapturePhotoIdPage();
