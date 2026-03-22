// Add Menu Image — POST {{app_url}}/addMenuImage/itemName

pm.test("Status code is 200 or 201", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

pm.test("Response time is less than 3000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(3000);
});

pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response body is not empty", function () {
    pm.expect(pm.response.text()).to.not.be.empty;
});
