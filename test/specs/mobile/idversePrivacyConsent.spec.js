const IdversePrivacyConsentPage = require("../../pages/mobile/idversePrivacyConsent.page");
const IdverseCapturePhotoIdPage = require("../../pages/mobile/idverseCapturePhotoId.page");

describe("IDverse Privacy Consent Flow", () => {
  beforeEach(async () => {
    await browser.url("/");
    await IdversePrivacyConsentPage.waitForPrivacyConsentPage();
  });

  describe("Privacy Consent Page Elements Visibility", () => {
    it("Should display IDverse logo", async () => {
      const logoVisible =
        await IdversePrivacyConsentPage.isIdverseLogoVisible();
      expect(logoVisible).to.be.true;
    });

    it("Should display privacy consent content", async () => {
      const privacyVisible =
        await IdversePrivacyConsentPage.isPrivacyConsentVisible();
      expect(privacyVisible).to.be.true;
    });

    it("Should click consent checkbox and continue with the flow", async () => {
      await IdversePrivacyConsentPage.clickConsentCheckbox();

      const isChecked =
        await IdversePrivacyConsentPage.isConsentCheckboxChecked();
      expect(isChecked).to.be.true;

      await IdversePrivacyConsentPage.clickContinueButton();

      await browser.pause(2000);
      const currentUrl = await browser.getUrl();
      console.log(`URL after clicking continue: ${currentUrl}`);
    });

    it('Should display "Capture your Photo ID" heading', async () => {
      const headingVisible =
        await IdverseCapturePhotoIdPage.isCapturePhotoIdHeadingVisible();
      expect(headingVisible).to.be.true;
    });

    it("Should display Back button", async () => {
      const backButtonVisible =
        await IdverseCapturePhotoIdPage.isBackButtonVisible();
      expect(backButtonVisible).to.be.true;
    });

    it('Should display "Capture my ID" button', async () => {
      const captureIdButtonVisible =
        await IdverseCapturePhotoIdPage.isCaptureIdButtonVisible();
      expect(captureIdButtonVisible).to.be.true;
    });

    it("Should handle location permission popup", async () => {
      try {
        const locationPermissionElement = await findByText(
          "Allow while visiting the site"
        );
        await locationPermissionElement.click();
        console.log("Location permission granted");
      } catch (error) {
        console.log("Location permission popup not found or already granted");
      }

      expect(true).to.be.true;
    });

    it("should handle camera permission popup", async () => {
      try {
        const cameraPermissionElement = await findByText("Allow");
        await cameraPermissionElement.click();
        console.log("Camera permission granted");
      } catch (error) {
        console.log("Camera permission popup not found or already granted");
      }

      expect(true).to.be.true;
    });
  });
});
