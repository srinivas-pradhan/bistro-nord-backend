import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from "@middy/http-error-handler";
import { getMenuItemsSchema as Request } from "../core/middleware/RequestValidation.mjs";
import { getMenuItemsSchema as Response } from "../core/middleware/ResponseValidation.mjs";

const getMenuItems = async (event) => {
    if (event.queryStringParameters.ItemType !== 'undefined' ) {
        console.log(event.queryStringParameters.ItemType)
    }
    else {
        console.log("No queryStringParameters passed.")
    }
}

export const getMenuItemsHandler = middy(getMenuItems)
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
