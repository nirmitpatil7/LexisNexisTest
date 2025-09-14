const ApiClient = require("../../utils/ApiClient");
const bookingTestData = require("../../data/bookingTestData");

describe("Update Booking API Tests", () => {
  let apiClient;
  let authToken;
  let createdBookingId;

  beforeEach(async () => {
    apiClient = new ApiClient();

    authToken = await apiClient.getAuthToken();

    // Create a booking to update in each test
    const createResponse = await apiClient.post(
      "/booking",
      bookingTestData.validBooking
    );
    if (createResponse.status === 200) {
      createdBookingId = createResponse.data.bookingid;
    }
  });

  context("Validate Update Booking API", () => {
    it("Should update a booking with valid data using Cookie authentication", async () => {
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const response = await apiClient.put(
        `/booking/${createdBookingId}`,
        bookingTestData.updateBookingData,
        authHeaders
      );

      // Verify response
      expect(response.status).to.equal(200);

      expect(response.data.firstname).to.equal(
        bookingTestData.updateBookingData.firstname
      );
      expect(response.data.lastname).to.equal(
        bookingTestData.updateBookingData.lastname
      );
      expect(response.data.totalprice).to.equal(
        bookingTestData.updateBookingData.totalprice
      );
      expect(response.data.depositpaid).to.equal(
        bookingTestData.updateBookingData.depositpaid
      );
      expect(response.data.additionalneeds).to.equal(
        bookingTestData.updateBookingData.additionalneeds
      );

      expect(response.data.bookingdates.checkin).to.equal(
        bookingTestData.updateBookingData.bookingdates.checkin
      );
      expect(response.data.bookingdates.checkout).to.equal(
        bookingTestData.updateBookingData.bookingdates.checkout
      );
    });

    it("Should update a booking with valid data using Basic authentication", async () => {
      const authHeaders = apiClient.createAuthHeaders("basic");
      const response = await apiClient.put(
        `/booking/${createdBookingId}`,
        bookingTestData.updateBookingAlternative,
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(response.data.firstname).to.equal(
        bookingTestData.updateBookingAlternative.firstname
      );
      expect(response.data.lastname).to.equal(
        bookingTestData.updateBookingAlternative.lastname
      );
      expect(response.data.totalprice).to.equal(
        bookingTestData.updateBookingAlternative.totalprice
      );
      expect(response.data.depositpaid).to.equal(
        bookingTestData.updateBookingAlternative.depositpaid
      );
    });

    it("Should fail to update booking without authentication", async () => {
      const response = await apiClient.put(
        `/booking/${createdBookingId}`,
        bookingTestData.updateBookingData
      );

      expect(response.status).to.equal(403);
    });

    it("Should fail to update non-existent booking", async () => {
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const nonExistentId = 999999;
      const response = await apiClient.put(
        `/booking/${nonExistentId}`,
        bookingTestData.updateBookingData,
        authHeaders
      );

      expect([404, 405]).to.include(response.status);
    });

    it("Should handle invalid booking ID format", async () => {
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const invalidId = "invalid_id";
      const response = await apiClient.put(
        `/booking/${invalidId}`,
        bookingTestData.updateBookingData,
        authHeaders
      );

      expect([400, 404, 405]).to.include(response.status);
    });
  });

  context("Edge Cases and Error Handling", () => {
    it("Should handle invalid authentication token", async () => {
      const invalidAuthHeaders = { Cookie: "token=invalid_token" };
      const response = await apiClient.put(
        `/booking/${createdBookingId}`,
        bookingTestData.updateBookingData,
        invalidAuthHeaders
      );

      expect(response.status).to.equal(403);
    });

    it("Should handle zero total price", async () => {
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const zeroPrice = {
        ...bookingTestData.updateBookingData,
        totalprice: 0,
      };

      const response = await apiClient.put(
        `/booking/${createdBookingId}`,
        zeroPrice,
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(response.data.totalprice).to.equal(0);
    });

    it("Should handle negative total price", async () => {
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const negativePrice = {
        ...bookingTestData.updateBookingData,
        totalprice: -100,
      };

      const response = await apiClient.put(
        `/booking/${createdBookingId}`,
        negativePrice,
        authHeaders
      );

      expect([200, 400]).to.include(response.status);
      if (response.status === 200) {
        console.log("API accepts negative prices:", response.data.totalprice);
      }
    });

    it("Should handle future check-in dates", async () => {
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const futureBooking = {
        ...bookingTestData.updateBookingData,
        bookingdates: {
          checkin: "2025-12-01",
          checkout: "2025-12-05",
        },
      };

      const response = await apiClient.put(
        `/booking/${createdBookingId}`,
        futureBooking,
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(response.data.bookingdates.checkin).to.equal(
        futureBooking.bookingdates.checkin
      );
    });

    it("Should handle invalid date formats", async () => {
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const invalidDates = {
        ...bookingTestData.updateBookingData,
        bookingdates: {
          checkin: "invalid-date",
          checkout: "2019-01-01",
        },
      };

      const response = await apiClient.put(
        `/booking/${createdBookingId}`,
        invalidDates,
        authHeaders
      );

      expect([200, 400]).to.include(response.status);
      if (response.status === 200) {
        console.log(
          "API transformed invalid date:",
          response.data.bookingdates
        );
      }
    });

    it("Should handle empty request body", async () => {
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const response = await apiClient.put(
        `/booking/${createdBookingId}`,
        {},
        authHeaders
      );

      expect([400, 500]).to.include(response.status);
    });

    it("Should handle missing required fields", async () => {
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const incompleteData = {
        firstname: "OnlyFirstName",
      };

      const response = await apiClient.put(
        `/booking/${createdBookingId}`,
        incompleteData,
        authHeaders
      );

      expect([400, 500]).to.include(response.status);
    });
  });
});
