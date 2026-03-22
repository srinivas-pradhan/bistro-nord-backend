# Bistro-Nord-Backend — Test Scripts

This folder contains exported Postman test scripts for the **Bistro-Nord-Backend** collection. Each file corresponds to a request in the collection and contains the associated test assertions.

## Test Files

| File | Request | Method | URL |
|---|---|---|---|
| `getMenuItems.test.js` | Get Menu Items | GET | `{{app_url}}/getMenuItems?ItemType=All` |
| `addMenuItem.test.js` | Add Menu Item | POST | `{{app_url}}/addMenuItem` |
| `addMenuImage.test.js` | Add Menu Image | POST | `{{app_url}}/addMenuImage/itemName` |
| `bookATable.test.js` | Book A Table | POST | `{{app_url}}/bookATable` |
| `doneWithAReservation.test.js` | Done With A Reservation | POST | `{{app_url}}/DoneWithAReservation/{BookingNumber}/{COMPLETE,CANCELLED}` |
| `updateAReservation.test.js` | Update A Reservation | PUT | `{{app_url}}/UpdateReservation/{BookingNumber}` |
| `getReservationDetails.test.js` | Get Reservation Details | GET | `{{app_url}}/GetAReservation/{BookingNumber}` |
| `getUsersReservation.test.js` | Get Users Reservation | GET | `{{app_url}}/GetUsersReservations/{email}` |

## Test Coverage

| Request | Tests |
|---|---|
| Get Menu Items | Status 200, response time < 2000ms, JSON validation, array shape, required fields (`itemName`, `itemType`) per item |
| Add Menu Item | Status 200/201, response time < 2000ms, JSON validation, object shape |
| Add Menu Image | Status 200/201, response time < 3000ms, JSON validation, non-empty body |
| Book A Table | Status 200/201, response time < 2000ms, JSON validation, `BookingNumber` present and saved to collection variable |
| Done With A Reservation | Status 200, response time < 2000ms, JSON validation, object shape |
| Update A Reservation | Status 200, response time < 2000ms, JSON validation, object shape |
| Get Reservation Details | Status 200, response time < 2000ms, JSON validation, `BookingNumber` and `status` fields |
| Get Users Reservation | Status 200, response time < 2000ms, JSON validation, array shape, `BookingNumber` & `status` per reservation |

## Notes

- All requests use the `{{app_url}}` environment variable as the base URL, configured in the **Bistro-Nord-Backend** Postman environment.
- The **Book A Table** request saves the returned `BookingNumber` to a collection variable (`{{BookingNumber}}`), which is used by the Done With A Reservation, Update A Reservation, and Get Reservation Details requests.
- These scripts are written using the [Postman test sandbox](https://learning.postman.com/docs/writing-scripts/script-references/test-examples/) (Chai.js assertions via `pm.test`).
