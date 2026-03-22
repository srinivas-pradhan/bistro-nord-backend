import { GenerateUploadSignedURL } from "../core/s3/s3Interactor.mjs";

import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from "@middy/http-error-handler";
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import { getMenuImageSchema as Request } from "../core/middleware/RequestValidation.mjs";
import { getMenuImageSchema as Response } from "../core/middleware/ResponseValidation.mjs";

const MenuTable = process.env.TABLE_NAME;

const addMenuImage = async (event) => {
  // Add Entry in the Database for the image location
  // Generate Signed URL and share the URL
}

export const addMenuImageHandler = middy(addMenuImage)
  .use(httpHeaderNormalizer())
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
