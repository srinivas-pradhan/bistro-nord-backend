// Book A Table — POST {{app_url}}/bookATable

pm.test("Status code is 200 or 201", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response contains a BookingNumber", function () {
    const json = pm.response.json();
    pm.expect(json).to.have.property("BookingNumber");
});

pm.test("BookingNumber is a non-empty string", function () {
    const json = pm.response.json();
    pm.expect(json.BookingNumber).to.be.a("string").and.not.empty;
});

// Save BookingNumber for use in subsequent requests
const json = pm.response.json();
if (json && json.BookingNumber) {
    pm.collectionVariables.set("BookingNumber", json.BookingNumber);
}
