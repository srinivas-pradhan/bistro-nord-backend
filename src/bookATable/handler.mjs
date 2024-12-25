import { 
  ValidateDate,
  DateConverter
 } from '../core/middleware/utils/GenericUtils.mjs';
import { BookATableSchema as Request } from '../core/middleware/RequestValidation.mjs';
import { BookATableSchema as Response } from "../core/middleware/ResponseValidation.mjs";
import { init as DDB } from "../core/dynamodb/dynamoInteractor.mjs";
import { Exception } from "../core/middleware/Exception.mjs";

import middy from "@middy/core";
import validator from "@middy/validator";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";


const BookATable = async (event) => {
  const  {
    fname,
    lname,
    email,
    datetime, // Convert this to unix time
    count,
    restaurantId
  } = event.body;

  const UnixDateTimeSeconds =  DateConverter(datetime);
  const BookingRef = restaurantId + '_' + email + '_' + '' + UnixDateTimeSeconds;

  const DBConnect = DDB(process.env.AWS_DEFAULT_REGION, process.env.TABLE_NAME );

  const CheckBookingExists = DBConnect.CheckBookingExists(BookingRef);
  console.log(CheckBookingExists)

  // const client = new DynamoDBClient({ region: process.env.AWS_DEFAULT_REGION });
  
  // Check if the same user has same reservation, time, location already in place.
    // Logic - Find bookingDatetime reference using BookingDateTime and then find the userID

  //If so - return relevant error code and cancel adding the booking.
  // If not then
  // Get the LastID using the GetItemCommand
  // Increment the LASTID + 1 and then set that as the new booking ID.
  // Add the data to the DynamoDB table.
 
  // const command = new PutItemCommand({
  //   "Item" : {
  //     "BookingId": {
  //       "S": "10000"
  //     },
  //     "BookingRef": {
  //       "S": "OTTA_srinivaspradhan@gmail.com_1735752600"
  //     },
  //     "BookingNumber": {
  //       "N": "OTTA_10000"
  //     },
  //     "RestaurantID": {
  //       "S": "OTTA"
  //     },
  //     "BookingDateTime": {
  //       "S": "1735752600"
  //     },
  //     "UserID": {
  //       "S": "srinivaspradhan@gmail.com"
  //     },
  //   },
  //   "TableName": process.env.TABLE_NAME
  // });
  try {
    return {
      statusCode: 201,
      body: JSON.stringify({
        // message: "results"
      })
    }
  } catch (error) {
    console.log(error)
  }

};

const TableBookHandler = middy(BookATable)
  .use(jsonBodyParser())
  .use(
    validator({
      Request,
      Response
    })
  )
  .use(httpErrorHandler());

export { TableBookHandler };
