import { 
    QueryDBUsingBookingNumber,
    UpdateDBItem 
} from "../core/dynamodb/dynamoInteractor.mjs";

import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from "@middy/http-error-handler";
import { ValidateDate } from '../core/middleware/utils/GenericUtils.mjs';
import { UpdateReservationSchema as Request } from '../core/middleware/RequestValidation.mjs';
import { UpdateReservationSchema as Response } from "../core/middleware/ResponseValidation.mjs";

const BookingNumber = process.env.BOOKING_NUMBER;

const UpdateReservation = async (event) => {
    let EAN, EAV, UpdateExp;
    const UnixDateTimeSeconds =  Math.round(Date.parse(event.body.datetime) / 1000);
    const DateVal = ValidateDate(UnixDateTimeSeconds);
    // Adding Path Param validation as its simpler than to use @middy/http-event-normalizer
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
    }
    if (! DateVal) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            val: "RESERVATION_UPDATE_FAILED",
            message: 'Updated Reservation Date is in the past.',
          })
        };
      }

    const GetBookingNumber = await QueryDBUsingBookingNumber(BookingNumber, event.pathParameters.OrderId);
    console.log('BookingNumber', event.pathParameters.OrderId)
    const BookingDetails = GetBookingNumber.Items[0]
    const QKey =  {
        BookingRef: {
            "S": BookingDetails.BookingRef.S
        }
    }
    if (!event.body.datetime && !event.body.count) {
        EAN = {
            "#S": "Status"
        }
        EAV = {
            ":s": {
                "S": event.body.status
            }
        }
        UpdateExp = "SET #S = :s"
    }
    else if (!event.body.count && event.body.datetime) {
        EAN = {
            "#S": "Status",
            "#D": "BookingDateTime"
        }
        EAV = {
            ":s": {
                "S": event.body.status
            },
            ":d": {
                "S": String(UnixDateTimeSeconds)
            }
        }
        UpdateExp = "SET #S = :s, #D = :d"
    }
    else if (!event.body.datetime && event.body.count) {
        EAN = {
            "#S": "Status",
            "#C": "Count"
        }
        EAV = {
            ":s": {
                "S": event.body.status
            },
            ":c": {
                "S": String(event.body.count)
            }
        }
        UpdateExp = "SET #S = :s, #C = :c"
    }
    else {
        EAN = {
            "#S": "Status",
            "#C": "Count",
            "#D": "BookingDateTime"

        }
        EAV = {
            ":s": {
                "S": event.body.status
            },
            ":c": {
                "S": String(event.body.count)
            },
            ":d": {
                "S": String(UnixDateTimeSeconds)
            }
        }
        UpdateExp = "SET #S = :s, #C = :c, #D = :d"
    }
    const DBItemUpd = await UpdateDBItem(EAN, EAV, UpdateExp, QKey)
    try {
        if ( DBItemUpd.$metadata.httpStatusCode === 200 ) {
            return {
              statusCode: 200,
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                val: 'RESERVATION_UPDATE_SUCCESS',
                message: {
                    "BookingNumber": DBItemUpd.Attributes.BookingNumber.S,
                    "DateTime": Number(DBItemUpd.Attributes.BookingDateTime.S),
                    "Status": DBItemUpd.Attributes.Status.S,
                    "Count": Number(DBItemUpd.Attributes.Count.S)
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
}

export const UpdateReservationHandler = middy(UpdateReservation)
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
