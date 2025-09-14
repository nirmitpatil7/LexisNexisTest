const ApiClient = require("../../utils/ApiClient");
const bookingTestData = require("../../data/bookingTestData");

describe("Delete Booking API Tests", () => {
  let apiClient;
  let authToken;

  beforeEach(async () => {
    apiClient = new ApiClient();
    authToken = await apiClient.getAuthToken();
  });

  context("Validate Delete Booking API", () => {
    it("Should delete a booking with valid ID using Cookie authentication", async () => {
      const createResponse = await apiClient.post(
        "/booking",
        bookingTestData.validBooking
      );
      expect(createResponse.status).to.equal(200);
      const bookingId = createResponse.data.bookingid;

      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const deleteResponse = await apiClient.delete(
        `/booking/${bookingId}`,
        authHeaders
      );

      expect(deleteResponse.status).to.equal(201);
    });

    it("Should delete a booking with valid ID using Basic authentication", async () => {
      const createResponse = await apiClient.post(
        "/booking",
        bookingTestData.validBookingAlternative
      );
      expect(createResponse.status).to.equal(200);
      const bookingId = createResponse.data.bookingid;

      const authHeaders = apiClient.createAuthHeaders("basic");
      const deleteResponse = await apiClient.delete(
        `/booking/${bookingId}`,
        authHeaders
      );

      expect(deleteResponse.status).to.equal(201);
    });

    it("Should fail to delete booking without authentication", async () => {
      const createResponse = await apiClient.post(
        "/booking",
        bookingTestData.validBooking
      );
      expect(createResponse.status).to.equal(200);
      const bookingId = createResponse.data.bookingid;

      const deleteResponse = await apiClient.delete(`/booking/${bookingId}`);

      expect(deleteResponse.status).to.equal(403);
    });

    it("Should handle deletion of non-existent booking", async () => {
      const nonExistentId = 999999;
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const deleteResponse = await apiClient.delete(
        `/booking/${nonExistentId}`,
        authHeaders
      );

      expect([404, 405]).to.include(deleteResponse.status);
    });

    it("Should handle invalid booking ID format", async () => {
      const invalidId = "invalid_id";
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const deleteResponse = await apiClient.delete(
        `/booking/${invalidId}`,
        authHeaders
      );

      expect([400, 404, 405]).to.include(deleteResponse.status);
    });

    it("Should handle negative booking ID", async () => {
      const negativeId = -1;
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const deleteResponse = await apiClient.delete(
        `/booking/${negativeId}`,
        authHeaders
      );

      expect([400, 404, 405]).to.include(deleteResponse.status);
    });

    it("Should handle zero booking ID", async () => {
      const zeroId = 0;
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const deleteResponse = await apiClient.delete(
        `/booking/${zeroId}`,
        authHeaders
      );

      expect([400, 404, 405]).to.include(deleteResponse.status);
    });

    it("Should handle multiple deletions of the same booking", async () => {
      const createResponse = await apiClient.post(
        "/booking",
        bookingTestData.validBooking
      );
      expect(createResponse.status).to.equal(200);
      const bookingId = createResponse.data.bookingid;

      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);

      const firstDelete = await apiClient.delete(
        `/booking/${bookingId}`,
        authHeaders
      );
      expect(firstDelete.status).to.equal(201);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const secondDelete = await apiClient.delete(
        `/booking/${bookingId}`,
        authHeaders
      );
      expect([404, 405]).to.include(secondDelete.status);
    });
  });

  context("Authentication and Authorization", () => {
    it("Should handle invalid authentication token", async () => {
      const createResponse = await apiClient.post(
        "/booking",
        bookingTestData.validBooking
      );
      expect(createResponse.status).to.equal(200);
      const bookingId = createResponse.data.bookingid;

      const invalidAuthHeaders = { Cookie: "token=invalid_token_123" };
      const deleteResponse = await apiClient.delete(
        `/booking/${bookingId}`,
        invalidAuthHeaders
      );

      expect(deleteResponse.status).to.equal(403);
    });

    it("Should handle malformed Authorization header", async () => {
      const createResponse = await apiClient.post(
        "/booking",
        bookingTestData.validBooking
      );
      expect(createResponse.status).to.equal(200);
      const bookingId = createResponse.data.bookingid;

      const malformedAuthHeaders = { Authorization: "InvalidFormat" };
      const deleteResponse = await apiClient.delete(
        `/booking/${bookingId}`,
        malformedAuthHeaders
      );

      expect(deleteResponse.status).to.equal(403);
    });
  });

  context("Edge Cases and Error Handling", () => {
    it("Should handle very large booking ID", async () => {
      const largeId = Number.MAX_SAFE_INTEGER;
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const deleteResponse = await apiClient.delete(
        `/booking/${largeId}`,
        authHeaders
      );

      expect([404, 405]).to.include(deleteResponse.status);
    });

    it("Should handle booking ID with special characters", async () => {
      const specialId = "abc@123#$%";
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const deleteResponse = await apiClient.delete(
        `/booking/${specialId}`,
        authHeaders
      );

      expect([400, 404, 405]).to.include(deleteResponse.status);
    });

    it("Should handle empty booking ID in URL", async () => {
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);
      const deleteResponse = await apiClient.delete("/booking/", authHeaders);

      expect([404, 405, 400]).to.include(deleteResponse.status);
    });

    it("Should handle concurrent deletion attempts", async () => {
      const createPromises = [
        apiClient.post("/booking", bookingTestData.validBooking),
        apiClient.post("/booking", bookingTestData.validBookingAlternative),
      ];

      const createResponses = await Promise.all(createPromises);
      createResponses.forEach((response) =>
        expect(response.status).to.equal(200)
      );

      const bookingIds = createResponses.map(
        (response) => response.data.bookingid
      );
      const authHeaders = apiClient.createAuthHeaders("cookie", authToken);

      const deletePromises = bookingIds.map((id) =>
        apiClient.delete(`/booking/${id}`, authHeaders)
      );

      const deleteResponses = await Promise.all(deletePromises);

      deleteResponses.forEach((response) => {
        expect(response.status).to.equal(201);
      });
    });
  });
});
