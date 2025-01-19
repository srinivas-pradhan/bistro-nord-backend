import { QueryDBUsingBookingNumber } from "../core/dynamodb/dynamoInteractor.mjs";

import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from "@middy/http-error-handler";
import { GetAReservationSchema as Response } from "../core/middleware/ResponseValidation.mjs";

const BookingNumber = process.env.BOOKING_NUMBER;

const GetAReservation = async (event) => {
    console.log("Yeah")
    if (!event.pathParameters.OrderId) {
        return {
            statusCode: 403,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              val: "REQUEST_NOT_ALLOWED",
              message: '{OrderId} Path Parameter missing',
            })
          };
    };

    try {
        const GetBookingNumber = await QueryDBUsingBookingNumber(BookingNumber, event.pathParameters.OrderId);
        console.log('BookingNumber:', event.pathParameters.OrderId)
        const BookingDetails = GetBookingNumber.Items[0]
        return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              val: 'RESERVATION_FOUND',
              Details: {
                UserID: BookingDetails.UserID.S,
                BookingDateTime: Number(BookingDetails.BookingDateTime.S),
                Count: Number(BookingDetails.Count.S),
                BookingNumber: BookingDetails.BookingNumber.S,
                RestaurantID: BookingDetails.RestaurantID.S
              }
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
}

export const GetAReservationHandler = middy(GetAReservation)
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
