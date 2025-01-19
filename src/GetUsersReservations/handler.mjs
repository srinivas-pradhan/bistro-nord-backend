import { ScanDB } from "../core/dynamodb/dynamoInteractor.mjs";

import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from "@middy/http-error-handler";
import { GetUsersReservationsSchema as Response } from "../core/middleware/ResponseValidation.mjs";

const GetUsersReservations = async (event) => {
    if (!event.pathParameters.UserId) {
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
    const  EAN = {
        "#B": "BookingNumber",
        "#C": "Count",
        "#S": "Status",
        "#D": "BookingDateTime"

    }
    const EAV = {
        ":u": {
            "S": event.pathParameters.UserId
        }
    }
    const FilExp = "UserID = :u"
    const ProjExp= "#B, #C, #S, #D"

    try {
        const GetAllReservations = await ScanDB(EAN, EAV, FilExp, ProjExp);
        console.log('UserId:', event.pathParameters.UserId)
        let Bookings = [];
        console.log(JSON.stringify(GetAllReservations))
        for ( let i = 0; i <=GetAllReservations.Count - 1 ; i++ ){
            Bookings.push({
                BookingDateTime: Number(GetAllReservations.Items[i].BookingDateTime.S),
                Count: Number(GetAllReservations.Items[i].Count.S),
                BookingNumber: GetAllReservations.Items[i].BookingNumber.S,
                Status: GetAllReservations.Items[i].Status.S
            })
        }
        if (GetAllReservations.Count > 0) {
            return {
                statusCode: 200,
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  val: 'USER_RESERVATIONS_EXISTS',
                  Details: {
                        UserId: event.pathParameters.UserId,
                        Reservations: Bookings
                    }
                })
            };
        }
        else {
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    val: 'RESERVATION_NOT_FOUND'
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

export const GetUsersReservationsHandler = middy(GetUsersReservations)
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
