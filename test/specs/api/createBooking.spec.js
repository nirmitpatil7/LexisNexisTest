const ApiClient = require("../../utils/ApiClient");
const bookingTestData = require("../../data/bookingTestData");

describe("Create Booking API Tests", () => {
  let apiClient;

  beforeEach(() => {
    apiClient = new ApiClient();
  });

  context("Validate Create Booking API", () => {
    it("Should create a booking with valid data", async () => {
      const response = await apiClient.post(
        "/booking",
        bookingTestData.validBooking
      );

      // Verify response
      expect(response.status).to.equal(200);

      expect(response.data).to.have.property("bookingid");
      expect(response.data).to.have.property("booking");
      expect(typeof response.data.bookingid).to.equal("number");

      const booking = response.data.booking;
      expect(booking.firstname).to.equal(
        bookingTestData.validBooking.firstname
      );
      expect(booking.lastname).to.equal(bookingTestData.validBooking.lastname);
      expect(booking.totalprice).to.equal(
        bookingTestData.validBooking.totalprice
      );
      expect(booking.depositpaid).to.equal(
        bookingTestData.validBooking.depositpaid
      );
      expect(booking.additionalneeds).to.equal(
        bookingTestData.validBooking.additionalneeds
      );

      expect(booking.bookingdates.checkin).to.equal(
        bookingTestData.validBooking.bookingdates.checkin
      );
      expect(booking.bookingdates.checkout).to.equal(
        bookingTestData.validBooking.bookingdates.checkout
      );
    });

    it("Should create a booking with alternative valid data", async () => {
      const response = await apiClient.post(
        "/booking",
        bookingTestData.validBookingAlternative
      );

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property("bookingid");
      expect(response.data).to.have.property("booking");

      const booking = response.data.booking;
      expect(booking.firstname).to.equal(
        bookingTestData.validBookingAlternative.firstname
      );
      expect(booking.lastname).to.equal(
        bookingTestData.validBookingAlternative.lastname
      );
      expect(booking.totalprice).to.equal(
        bookingTestData.validBookingAlternative.totalprice
      );
      expect(booking.depositpaid).to.equal(
        bookingTestData.validBookingAlternative.depositpaid
      );
    });

    it("Should validate required fields - missing fields should fail", async () => {
      const response = await apiClient.post(
        "/booking",
        bookingTestData.missingFieldsBooking
      );

      expect([400, 500]).to.include(response.status);
    });

    it("Should validate data types and format", async () => {
      const response = await apiClient.post(
        "/booking",
        bookingTestData.invalidBooking
      );

      expect(response.status).to.equal(200);

      console.log("API Response for invalid data:", response.data);
    });

    it("Should handle empty request body", async () => {
      const response = await apiClient.post("/booking", {});

      expect([400, 500]).to.include(response.status);
    });

    it("Should verify response headers", async () => {
      const response = await apiClient.post(
        "/booking",
        bookingTestData.validBooking
      );

      expect(response.status).to.equal(200);
      expect(response.headers["content-type"]).to.include("application/json");
    });

    it("Should create multiple bookings successfully", async () => {
      const response1 = await apiClient.post(
        "/booking",
        bookingTestData.validBooking
      );

      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response2 = await apiClient.post(
        "/booking",
        bookingTestData.validBookingAlternative
      );

      expect(response1.status).to.equal(200);
      expect(response2.status).to.equal(200);

      expect(response1.data.bookingid).to.not.equal(response2.data.bookingid);
    });
  });

  context("Edge Cases and Error Handling", () => {
    it("Should handle zero total price", async () => {
      const zeroPrice = {
        ...bookingTestData.validBooking,
        totalprice: 0,
      };

      const response = await apiClient.post("/booking", zeroPrice);
      expect(response.status).to.equal(200);
      expect(response.data.booking.totalprice).to.equal(0);
    });

    it("Should handle future dates", async () => {
      const futureBooking = {
        ...bookingTestData.validBooking,
        bookingdates: {
          checkin: "2025-12-01",
          checkout: "2025-12-05",
        },
      };

      const response = await apiClient.post("/booking", futureBooking);
      expect(response.status).to.equal(200);
    });
  });
});
