import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";


const UpdateReservationHandler = async (event) => {
    console.log("Hello World")
}

export const TableBookHandler = middy(UpdateReservation)
  .use(jsonBodyParser())
//   .use(
//     validator({
//       eventSchema: transpileSchema(Request),
//       Response
//     })
//   )
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
