// Get Menu Items — GET {{app_url}}/getMenuItems?ItemType=All

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response body is an array", function () {
    const json = pm.response.json();
    pm.expect(json).to.be.an("array");
});

pm.test("Each menu item has required fields", function () {
    const json = pm.response.json();
    json.forEach(function (item) {
        pm.expect(item).to.have.property("itemName");
        pm.expect(item).to.have.property("itemType");
    });
});
