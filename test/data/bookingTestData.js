const bookingTestData = {
  validBooking: {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  },

  validBookingAlternative: {
    firstname: "Jane",
    lastname: "Smith",
    totalprice: 250,
    depositpaid: false,
    bookingdates: {
      checkin: "2024-01-15",
      checkout: "2024-01-20",
    },
    additionalneeds: "Lunch",
  },

  updateBookingData: {
    firstname: "James",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  },

  updateBookingAlternative: {
    firstname: "Jennifer",
    lastname: "Wilson",
    totalprice: 350,
    depositpaid: false,
    bookingdates: {
      checkin: "2024-06-01",
      checkout: "2024-06-07",
    },
    additionalneeds: "Dinner",
  },

  partialUpdateData: {
    firstname: "UpdatedName",
    lastname: "UpdatedLastName",
    totalprice: 999,
  },

  invalidUpdateData: {
    firstname: "",
    lastname: "Brown",
    totalprice: "invalid_price",
    depositpaid: "not_boolean",
    bookingdates: {
      checkin: "invalid-date",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  },

  invalidBooking: {
    firstname: "",
    lastname: "Brown",
    totalprice: "invalid",
    depositpaid: "not boolean",
    bookingdates: {
      checkin: "invalid-date",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  },

  missingFieldsBooking: {
    firstname: "John",
    lastname: "Doe",
  },
};

module.exports = bookingTestData;
