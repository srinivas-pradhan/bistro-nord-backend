// Add Menu Item — POST {{app_url}}/addMenuItem

pm.test("Status code is 200 or 201", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response contains success message or created item", function () {
    const json = pm.response.json();
    pm.expect(json).to.be.an("object");
});
