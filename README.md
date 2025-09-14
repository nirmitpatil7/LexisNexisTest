# Technical Test Automation Framework

A comprehensive test automation framework built with WebDriverIO supporting Desktop, Mobile, and API testing.

## 🚀 Features

- **Multi-Platform Testing**: Desktop (Chrome), Mobile (Android), and API testing
- **Page Object Model**: Organized and maintainable test structure
- **Parallel Execution**: Run tests concurrently for faster execution
- **Allure Reporting**: Detailed test reports with screenshots
- **Data-Driven Testing**: External test data management
- **Cross-Browser Support**: Chrome, Firefox, Edge, Safari
- **API Testing**: RESTful API validation with comprehensive test coverage

## 📁 Project Structure

```
├── config/                    # Configuration files
│   ├── wdio.api.conf.js      # API testing configuration
│   ├── wdio.desktop.conf.js  # Desktop testing configuration
│   └── wdio.mobile.conf.js   # Mobile testing configuration
├── test/
│   ├── data/                 # Test data files
│   ├── pages/                # Page Object Models
│   │   ├── desktop/          # Desktop page objects
│   │   └── mobile/           # Mobile page objects
│   ├── specs/                # Test specifications
│   │   ├── api/              # API test cases
│   │   ├── desktop/          # Desktop test cases
│   │   └── mobile/           # Mobile test cases
│   ├── support/              # Support utilities
│   └── utils/                # Utility classes
├── reports/                  # Test reports
├── screenshots/              # Test screenshots
└── package.json             # Dependencies and scripts
```

## 🛠️ Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Java** (v8 or higher) for Allure reports
- **Android Studio** (for mobile testing)
- **Chrome Browser**

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/LexisNexisTest.git
cd LexisNexisTest
```

2. Install dependencies:

```bash
npm install
```

3. For mobile testing, start Appium server:

```bash
npm run appium:start
```

## 🧪 Running Tests

### Desktop Tests

```bash
# Run all desktop tests
npm run test:desktop

# Run individual desktop tests
npm run test:desktop:logo
npm run test:desktop:login
npm run test:desktop:searchbox
npm run test:desktop:search
```

### API Tests

```bash
# Run all API tests
npm run test:api

# Run specific API test suites
npm run test:api:create
npm run test:api:get
npm run test:api:update
npm run test:api:delete

# Run individual API test cases
npm run test:api:create:valid
npm run test:api:create:alternative
npm run test:api:create:missing
npm run test:api:create:invalid
npm run test:api:create:empty
npm run test:api:create:headers
npm run test:api:create:multiple
npm run test:api:create:zeroprice
npm run test:api:create:future
```

### Mobile Tests

```bash
# Run all mobile tests
npm run test:mobile
```

### Run All Tests

```bash
# Run complete test suite
npm run test:all
```

## 📊 Test Reports

After running tests, generate Allure reports:

```bash
# Generate and open Allure report
npx allure generate reports/allure-results --clean -o reports/allure-report
npx allure open reports/allure-report
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file for environment-specific configurations:

```
BASE_URL=https://www.cheapflights.com.au
API_BASE_URL=https://restful-booker.herokuapp.com
TIMEOUT=30000
```

### Browser Configuration

Modify `config/wdio.desktop.conf.js` for browser-specific settings:

- Chrome options
- Window size
- Headless mode
- Download directory

### Mobile Configuration

Update `config/wdio.mobile.conf.js` for device settings:

- Device name
- Platform version
- App path
- Capabilities

## 📝 Writing Tests

### Desktop Test Example

```javascript
const HomePage = require("../../pages/desktop/HomePage");

describe("Homepage Tests", () => {
  it("Should display logo", async () => {
    await HomePage.open();
    const isVisible = await HomePage.isLogoVisible();
    expect(isVisible).to.be.true;
  });
});
```

### API Test Example

```javascript
const ApiClient = require("../../utils/ApiClient");

describe("API Tests", () => {
  it("Should create booking", async () => {
    const apiClient = new ApiClient();
    const response = await apiClient.post("/booking", testData);
    expect(response.status).to.equal(200);
  });
});
```

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
name: Test Automation
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "16"
      - run: npm install
      - run: npm run test:api
      - run: npm run test:desktop
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛟 Support

For questions or issues, please:

1. Check existing [Issues](https://github.com/YOUR_USERNAME/Technical-Test-Automation/issues)
2. Create a new issue with detailed description
3. Include test logs and screenshots if applicable

## 📈 Test Coverage

- **Desktop Tests**: 4 test cases covering UI elements and search functionality
- **API Tests**: 20+ test cases covering CRUD operations and edge cases
- **Mobile Tests**: Platform-specific mobile application testing

## 🔍 Debugging

### Common Issues

1. **ChromeDriver version mismatch**:

   ```bash
   npm install chromedriver@latest
   ```

2. **Appium connection issues**:

   ```bash
   npm run appium:start
   ```

3. **Test timeouts**:
   - Increase timeout in configuration files
   - Check network connectivity
   - Verify element selectors

---

**Happy Testing! 🎉**


