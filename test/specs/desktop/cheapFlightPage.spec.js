const HomePage = require("../../pages/desktop/HomePage");

describe("CheapFlights Page Elements Visibility and Search Test", () => {
  beforeEach(async () => {
    await HomePage.open();
  });

  it("Should display the website logo element on the homepage", async () => {
    const isLogoVisible = await HomePage.isLogoVisible();
    expect(isLogoVisible).to.be.true;
  });

  it("Should display the login header", async () => {
    const isLoginHeaderVisible = await HomePage.isLoginHeaderVisible();
    expect(isLoginHeaderVisible).to.be.true;
  });

  it("Should display the flight search box ", async () => {
    const isSearchBoxVisible = await HomePage.isSearchBoxVisible();
    expect(isSearchBoxVisible).to.be.true;
  });

  it("Search and validate the flight search functionality", async () => {
    const isSearchInputVisible = await HomePage.isSearchInputVisible();
    expect(isSearchInputVisible).to.be.true;

    await HomePage.enterSearchValue("kerala");

    const isCityValueCorrect = await HomePage.isCityValueCorrect(
      "Kerala, India"
    );
    expect(isCityValueCorrect).to.be.true;

    const isDatePopupVisible = await HomePage.isDatePopupVisible();
    expect(isDatePopupVisible).to.be.true;

    await HomePage.selectLastDateOption();

    expect(isDatePopupVisible).to.be.true;
    await HomePage.selectLastDateOption();

    const isTravellersPopupVisible =
      await HomePage.isTravellersDetailsPopupVisible();
    expect(isTravellersPopupVisible).to.be.true;

    await HomePage.clickSearchButton();

    const isExploreHeaderVisible = await HomePage.isExploreHeaderVisible();
    expect(isExploreHeaderVisible).to.be.true;

    const isExploreKeralaCorrect = await HomePage.isExploreHeaderCorrect(
      "Explore Kerala"
    );
    expect(isExploreKeralaCorrect).to.be.true;

    const isFirstDestinationVisible =
      await HomePage.isFirstDestinationResultVisible();
    expect(isFirstDestinationVisible).to.be.true;
  });
});
