import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from "@middy/http-error-handler";
import { UpdateReservationSchema as Response } from "../core/middleware/ResponseValidation.mjs";

const UpdateReservation = async (event) => {
    console.log("Hello World")
    return{
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: event.pathParameters.OrderId
    }
}

export const UpdateReservationHandler = middy(UpdateReservation)
  .use(
    validator({
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
