import { 
  ValidateDate,
  DateConverter
 } from '../core/middleware/utils/GenericUtils.mjs';
import { BookATableSchema as Request } from '../core/middleware/RequestValidation.mjs';
import { BookATableSchema as Response } from "../core/middleware/ResponseValidation.mjs";
import { 
  PutDBItem,
  CheckIfBookingExists,
  GetLastId,
  IncrementLastId
} from "../core/dynamodb/dynamoInteractor.mjs";

import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";

// Rel world only takes unix epoch time in seconds -> Time and TimeZone conversion & re-conversion happens at client.
const BookATable = async (event) => {
  const  {
    fname,
    lname,
    email,
    datetime,
    count,
    restaurantId,
    status
  } = event.body;

  const UnixDateTimeSeconds =  Math.round(Date.parse(datetime) / 1000);
  const DateVal = ValidateDate(UnixDateTimeSeconds);

  const BookingRef = restaurantId + '_' + email + '_' + '' + UnixDateTimeSeconds;
  const BookingExists = await CheckIfBookingExists(BookingRef);

  if ( BookingExists.Item ) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        val: 'BOOKING_EXISTS',
        message: `Booking for the user ${email} on ${datetime} in ${restaurantId} already exists.`
      })
    };
  }
  if (! DateVal) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        val: "RESERVATION_EXISTS",
        message: 'Reservation Date is in the past.',
      })
    };
  }

  const LastIDinDB = await GetLastId();
  
  if ( LastIDinDB.$metadata.httpStatusCode !== 200 ) {
    return {
      statusCode: 530,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        val: 'SITE_FROZEN',
        message: 'Site is Frozen - Please Call Support.'
      })
    };
  };

  const IncrementValue = Number(LastIDinDB.Item.Count.S) + 1
  const Booking = await PutDBItem(
    {
      "BookingRef": {
        "S": BookingRef
      },
      "BookingId": {
        "S": "" + IncrementValue
      },
      "BookingNumber": {
        "S": restaurantId + "" + IncrementValue
      },
      "RestaurantID": {
        "S": restaurantId
      },
      "UserID": {
        "S": email
      },
      "BookingDateTime": {
        "S": "" + UnixDateTimeSeconds
      },
      "Status": {
        "S": status
      },
      "Count": {
        "S": count
      }
    }
  )
  const LastIdIncrementDB = await IncrementLastId("" + IncrementValue)

  try {
    if ( Booking.$metadata.httpStatusCode === 200 && LastIdIncrementDB.$metadata.httpStatusCode === 200) {
      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          val: 'TABLE_BOOKED',
          message: {
            "BookingNumber": restaurantId + "" + IncrementValue
          }
        })
      };
    };
  } catch (error) {
      console.log(error)
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          val: 'INTERNAL_SERVER_ERROR'
        })
      };
  }
};

export const TableBookHandler = middy(BookATable)
  .use(jsonBodyParser())
  .use(
    validator({
      eventSchema: transpileSchema(Request),
      Response
    })
  )
  .use({
    onError: (request) => {
      const response = request.response;
      const error = request.error;
      if (response.statusCode != 400) return;
      if (!error.expose || !error.cause) return;
      response.headers["Content-Type"] = "application/json";
      response.body = JSON.stringify({ message: response.body, validationErrors: error.cause });
    },
  })
  .use(httpErrorHandler());
