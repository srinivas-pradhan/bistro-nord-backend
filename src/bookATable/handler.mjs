import { 
  ValidateDate,
  DateConverter
 } from '../core/middleware/utils/GenericUtils.mjs';
// import { BookATableSchema as Request } from '../core/middleware/RequestValidation.mjs';
// import { BookATableSchema as Response } from "../core/middleware/ResponseValidation.mjs";
import { 
  PutDBItem,
  CheckIfBookingExists,
  GetLastId,
  IncrementLastId
} from "../core/dynamodb/dynamoInteractor.mjs";

// import middy from "@middy/core";
// import validator from "@middy/validator";
// import httpErrorHandler from "@middy/http-error-handler";
// import jsonBodyParser from "@middy/http-json-body-parser";


export const BookATable = async (event) => {
  const  {
    fname,
    lname,
    email,
    datetime,
    count,
    restaurantId
  } = JSON.parse(event.body);

  const UnixDateTimeSeconds =  Math.round(Date.parse(datetime) / 1000);
  const Prior30Mins = UnixDateTimeSeconds - (30*60);
  const Latter30Mins = UnixDateTimeSeconds + (30*60);
  const DateVal = ValidateDate(UnixDateTimeSeconds);

  const BookingRef = restaurantId + '_' + email + '_' + '' + UnixDateTimeSeconds;
  const BookingRefPrior30Mins = restaurantId + '_' + email + '_' + '' + Prior30Mins;
  const BookingRefLatter30Mins = restaurantId + '_' + email + '_' + '' + Latter30Mins;

  const BookingExists = await CheckIfBookingExists(BookingRef);
  const BookingExistsPrior30Mins = await CheckIfBookingExists(BookingRefPrior30Mins);
  const BookingExistsLatter30Mins = await CheckIfBookingExists(BookingRefLatter30Mins);

  const LastID = await GetLastId();


  if (BookingExists.Item || BookingExistsPrior30Mins.Item || BookingExistsLatter30Mins.Item ) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        val: 'BOOKING_EXISTS',
        message: `Booking for the user ${email} on ${datetime} in ${restaurantId} already exists. You cannot add another reservation at the same location within that hour.`
      })
    };
  }
  if ( LastID.$metadata.httpStatusCode !== 200 ) {
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
  //       "N": "OTTA10000"
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: LastID.Item.Count.N,
        data: BookingExists
      })
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

// const TableBookHandler = middy(BookATable)
//   .use(jsonBodyParser())
//   .use(
//     validator({
//       Request,
//       Response
//     })
//   )
//   .use(httpErrorHandler());

// export { TableBookHandler };
