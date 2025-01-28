import { 
    PutDBItem,
    QueryDBUsingBookingNumber,
    DeleteItem
 } from "../core/dynamodb/dynamoInteractor.mjs";

 import middy from "@middy/core";
 import validator from "@middy/validator";
 import { transpileSchema } from '@middy/validator/transpile'
 import httpErrorHandler from "@middy/http-error-handler";
 import { DoneWithAReservationSchema as Request } from '../core/middleware/RequestValidation.mjs';
 import { DoneWithAReservationSchema as Response } from "../core/middleware/ResponseValidation.mjs";

const BookingNumber = process.env.BOOKING_NUMBER;
const Done_Table = process.env.DONE_TABLE_NAME;


const DoneWithAReservation = async (event) => {
    console.log('OrderId:', event.pathParameters.OrderId)
    console.log('Status:', event.pathParameters.Status)
    var Done_Booking, DeleteFromBookATable;
    try {
        var GetBookingNumber = await QueryDBUsingBookingNumber(BookingNumber, event.pathParameters.OrderId);
        GetBookingNumber.Items[0].Status.S = event.pathParameters.Status
    } catch (error) {
        console.log(error)
        return {
            statusCode: 404,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              val: 'BOOKING_NOT_FOUND'
            })
        };
    }
    try {
        const DoneItem = GetBookingNumber.Items[0]
        Done_Booking = await PutDBItem(DoneItem, Done_Table)
        DeleteFromBookATable = await DeleteItem(GetBookingNumber.Items[0].BookingRef.S)
    } catch (error) {
        console.log(error)
        return {
            statusCode: 412,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              val: 'BOOKING_DONE_LIFECYCLE_FAILED',
              message: `Please Try again if Status didn't change to : ${event.pathParameters.Status}`
            })
        };
    }
    if (Done_Booking.$metadata.httpStatusCode === 200 && DeleteFromBookATable.$metadata.httpStatusCode === 200){
        return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              val: 'BOOKING_DONE_LIFECYCLE_SUCCESS',
              message: `Booking Status : ${event.pathParameters.Status}`
            })
        };
    }
    else {
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

export const DoneWithAReservationHandler = middy(DoneWithAReservation)
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
