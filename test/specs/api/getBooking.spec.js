const ApiClient = require("../../utils/ApiClient");
const bookingTestData = require("../../data/bookingTestData");

describe("Get Booking API Tests", () => {
  let apiClient;
  let createdBookingId;

  beforeEach(async () => {
    apiClient = new ApiClient();

    // Create a booking to retrieve in each test
    const createResponse = await apiClient.post(
      "/booking",
      bookingTestData.validBooking
    );
    if (createResponse.status === 200) {
      createdBookingId = createResponse.data.bookingid;
      createdBookingData = createResponse.data.booking;
    }
  });

  context("Validate Get Booking API", () => {
    it("Should retrieve a booking with valid ID", async () => {
      const response = await apiClient.get(`/booking/${createdBookingId}`);

      // Verify response
      expect(response.status).to.equal(200);

      expect(response.data).to.have.property("firstname");
      expect(response.data).to.have.property("lastname");
      expect(response.data).to.have.property("totalprice");
      expect(response.data).to.have.property("depositpaid");
      expect(response.data).to.have.property("bookingdates");
      expect(response.data).to.have.property("additionalneeds");

      expect(typeof response.data.firstname).to.equal("string");
      expect(typeof response.data.lastname).to.equal("string");
      expect(typeof response.data.totalprice).to.equal("number");
      expect(typeof response.data.depositpaid).to.equal("boolean");
      expect(typeof response.data.bookingdates).to.equal("object");
      expect(typeof response.data.additionalneeds).to.equal("string");

      expect(response.data.bookingdates).to.have.property("checkin");
      expect(response.data.bookingdates).to.have.property("checkout");
      expect(typeof response.data.bookingdates.checkin).to.equal("string");
      expect(typeof response.data.bookingdates.checkout).to.equal("string");

      expect(response.data.firstname).to.equal(
        bookingTestData.validBooking.firstname
      );
      expect(response.data.lastname).to.equal(
        bookingTestData.validBooking.lastname
      );
      expect(response.data.totalprice).to.equal(
        bookingTestData.validBooking.totalprice
      );
      expect(response.data.depositpaid).to.equal(
        bookingTestData.validBooking.depositpaid
      );
    });

    it("Should return 404 for non-existent booking ID", async () => {
      const nonExistentId = 999999;
      const response = await apiClient.get(`/booking/${nonExistentId}`);

      expect(response.status).to.equal(404);
    });

    it("Should handle invalid booking ID format", async () => {
      const invalidId = "invalid_id";
      const response = await apiClient.get(`/booking/${invalidId}`);

      expect(response.status).to.equal(404);
    });

    it("Should handle negative booking ID", async () => {
      const negativeId = -1;
      const response = await apiClient.get(`/booking/${negativeId}`);

      expect(response.status).to.equal(404);
    });
  });

  context("Edge Cases and Error Handling", () => {
    it("Should handle very large booking ID", async () => {
      const largeId = Number.MAX_SAFE_INTEGER;
      const response = await apiClient.get(`/booking/${largeId}`);

      expect(response.status).to.equal(404);
    });

    it("Should handle booking ID with special characters", async () => {
      const specialId = "abc@123";
      const response = await apiClient.get(`/booking/${specialId}`);

      expect(response.status).to.equal(404);
    });

    it("Should handle empty booking ID", async () => {
      const response = await apiClient.get("/booking/");

      if (response.status === 200) {
        console.log(
          "API returns 200 for empty booking ID - likely returns booking list"
        );
      } else {
        expect([404, 405]).to.include(response.status);
      }
    });

    it("Should verify response time is reasonable", async () => {
      const startTime = Date.now();
      const response = await apiClient.get(`/booking/${createdBookingId}`);
      const responseTime = Date.now() - startTime;

      expect(response.status).to.equal(200);
      expect(responseTime).to.be.lessThan(5000);
      console.log(`Response time: ${responseTime}ms`);
    });
  });
});
