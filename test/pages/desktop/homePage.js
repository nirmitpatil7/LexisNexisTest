class HomePage {
  get logoElement() {
    return $(".mc6t-logo.mc6t-mod-hide-empty");
  }

  get loginHeaderElement() {
    return $(".wRhj.wRhj-mod-justify-end");
  }

  get searchBoxElement() {
    return $(
      ".J_T2-row.J_T2-mod-collapse-l.J_T2-mod-spacing-y-none.J_T2-mod-spacing-x-none.J_T2-mod-with-bg.J_T2-mod-with-shadow.J_T2-mod-rounding-medium"
    );
  }

  get oneWayTicketOption() {
    return $$(
      ".AFFP.AFFP-body.AFFP-m.AFFP-res.AFFP-emphasis.E7mi.E7mi-mod-elevation-one.E7mi-mod-active"
    )[1];
  }

  get searchInputField() {
    return $('input[aria-label="Flight destination input"]');
  }

  get cityValidationField() {
    return $(
      ".AQWr-mod-padding-left-none.AQWr-mod-padding-right-none.NhpT.NhpT-mod-radius-none.NhpT-mod-corner-radius-all.NhpT-mod-size-large.NhpT-mod-state-default.NhpT-mod-text-overflow-ellipsis.NhpT-mod-theme-search.NhpT-mod-validation-state-neutral.NhpT-mod-validation-style-border.NhpT-mod-reset-default-width.NhpT-mod-full-width-height"
    );
  }

  get selectedDestinationValue() {
    return $(".c_neb-item-value");
  }

  get datePopup() {
    return $(".sGVi.sGVi-dropdown-content");
  }

  get dateButtons() {
    return $$(".vn3g-button");
  }

  get lastDateButton() {
    return this.dateButtons[this.dateButtons.length - 1];
  }

  get travellersDetailsPopup() {
    return $(
      ".Gagx.Gagx-mod-radius-medium.Gagx-mod-animated.Gagx-visible.FqLu-mod-overflow-y"
    );
  }

  get searchButton() {
    return $(
      ".RxNS.RxNS-mod-stretch.RxNS-mod-animation-search.RxNS-mod-variant-solid.RxNS-mod-theme-progress.RxNS-mod-shape-default.RxNS-mod-spacing-base.RxNS-mod-size-medium"
    );
  }

  get exploreHeader() {
    return $(".ARBL-explore-title");
  }

  get firstDestinationResult() {
    return $$(".RJ1k.RJ1k-mod-products-2")[0];
  }

  async open() {
    await browser.url("https://www.cheapflights.com.au/");
    await browser.maximizeWindow();
  }

  async isLogoVisible() {
    await this.logoElement.waitForDisplayed({ timeout: 10000 });
    return await this.logoElement.isDisplayed();
  }

  async isLoginHeaderVisible() {
    await this.loginHeaderElement.waitForDisplayed({ timeout: 10000 });
    return await this.loginHeaderElement.isDisplayed();
  }

  async isSearchBoxVisible() {
    await this.searchBoxElement.waitForDisplayed({ timeout: 10000 });
    return await this.searchBoxElement.isDisplayed();
  }

  async clickOneWayOption() {
    await this.oneWayTicketOption.waitForDisplayed({ timeout: 10000 });
    await this.oneWayTicketOption.click();
  }

  async isOneWayOptionVisible() {
    await this.oneWayTicketOption.waitForDisplayed({ timeout: 10000 });
    return await this.oneWayTicketOption.isDisplayed();
  }

  async clickSearchInputField() {
    await this.searchInputField.waitForDisplayed({ timeout: 10000 });
    await this.searchInputField.click();
  }

  async enterSearchValue(value) {
    await this.searchInputField.waitForDisplayed({ timeout: 10000 });
    await this.searchInputField.click();
    await this.searchInputField.clearValue();
    await this.searchInputField.setValue(value);

    // Add delay between setValue and pressing Enter
    await browser.pause(3000); // 3 seconds delay

    await browser.keys("Enter");
  }

  async isSearchInputVisible() {
    await this.searchInputField.waitForDisplayed({ timeout: 10000 });
    return await this.searchInputField.isDisplayed();
  }

  async getEnteredCityValue() {
    await this.searchInputField.waitForDisplayed({ timeout: 10000 });
    return await this.searchInputField.getValue();
  }

  async isCityValueCorrect(expectedValue) {
    const actualValue = await this.getEnteredCityValue();
    return actualValue === expectedValue;
  }

  async getSelectedDestinationText() {
    await this.selectedDestinationValue.waitForDisplayed({ timeout: 10000 });
    return await this.selectedDestinationValue.getText();
  }

  async isDestinationSelected(expectedText) {
    const actualText = await this.getSelectedDestinationText();
    return actualText.toLowerCase().includes(expectedText.toLowerCase());
  }

  async isDatePopupVisible() {
    await this.datePopup.waitForDisplayed({ timeout: 10000 });
    return await this.datePopup.isDisplayed();
  }

  async selectLastDateOption() {
    const dateButtons = await this.dateButtons;
    const lastButton = dateButtons[dateButtons.length - 1];
    await lastButton.waitForDisplayed({ timeout: 10000 });
    await lastButton.click();
  }

  async isTravellersDetailsPopupVisible() {
    await this.travellersDetailsPopup.waitForDisplayed({ timeout: 10000 });
    return await this.travellersDetailsPopup.isDisplayed();
  }

  async clickSearchButton() {
    await this.searchButton.waitForDisplayed({ timeout: 10000 });

    await browser.execute(() => {
      const searchButton = document.querySelector(
        ".RxNS.RxNS-mod-stretch.RxNS-mod-animation-search.RxNS-mod-variant-solid.RxNS-mod-theme-progress.RxNS-mod-shape-default.RxNS-mod-spacing-base.RxNS-mod-size-medium"
      );
      if (searchButton) {
        searchButton.removeAttribute("target");
        searchButton.removeAttribute("rel");

        let parent = searchButton.parentElement;
        while (parent && parent !== document.body) {
          if (parent.tagName === "A" || parent.tagName === "FORM") {
            parent.removeAttribute("target");
            parent.removeAttribute("rel");
          }
          parent = parent.parentElement;
        }
      }
    });

    await this.searchButton.click();
  }

  async isExploreHeaderVisible() {
    await this.exploreHeader.waitForDisplayed({ timeout: 15000 });
    return await this.exploreHeader.isDisplayed();
  }

  async getExploreHeaderText() {
    await this.exploreHeader.waitForDisplayed({ timeout: 15000 });
    return await this.exploreHeader.getText();
  }

  async isExploreHeaderCorrect(expectedHeaderText) {
    const headerText = await this.getExploreHeaderText();
    return headerText.includes(expectedHeaderText);
  }

  async isFirstDestinationResultVisible() {
    await this.firstDestinationResult.waitForDisplayed({ timeout: 15000 });
    return await this.firstDestinationResult.isDisplayed();
  }
}

module.exports = new HomePage();
