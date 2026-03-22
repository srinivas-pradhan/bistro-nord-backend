// Get Users Reservation — GET {{app_url}}/GetUsersReservations/{email}

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response is an array of reservations", function () {
    const json = pm.response.json();
    pm.expect(json).to.be.an("array");
});

pm.test("Each reservation has a BookingNumber and status", function () {
    const json = pm.response.json();
    json.forEach(function (reservation) {
        pm.expect(reservation).to.have.property("BookingNumber");
        pm.expect(reservation).to.have.property("status");
    });
});
