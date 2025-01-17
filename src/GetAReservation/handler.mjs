import { QueryDBUsingBookingNumber } from "../core/dynamodb/dynamoInteractor.mjs";

import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from "@middy/http-error-handler";
import { GetAReservationSchema as Response } from "../core/middleware/ResponseValidation.mjs";

const BookingNumber = process.env.BOOKING_NUMBER;

const GetAReservation = async (event) => {
    console.log("Yeah")
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
