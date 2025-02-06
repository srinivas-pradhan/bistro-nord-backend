import { 
  PutDBItem
} from "../core/dynamodb/dynamoInteractor.mjs";
import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";

import { addAddMenuItemSchema as Request } from '../core/middleware/RequestValidation.mjs';
import { addAddMenuItemSchema as Response } from "../core/middleware/ResponseValidation.mjs";

const MenuTable = process.env.TABLE_NAME;

const addMenuItem = async (event) => {
  const  {
    MenuItem,
    Description,
    ImageLink,
    Price
  } = event.body;
    const MenuItemAdd = await PutDBItem(
      {
        "MenuItem": {
          "S": MenuItem
        },
        "Description": {
          "S": Description
        },
        "ImageLink": {
          "S": ImageLink
        },
        "Price": {
          "S": String(Price)
        }        
      }, 
    MenuTable);
    try {
      if ( MenuItemAdd.$metadata.httpStatusCode === 200 ) {
        return {
          statusCode: 201,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            val: 'MENU_ITEM_ADDED'
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
}

export const addMenuItemHandler = middy(addMenuItem)
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
