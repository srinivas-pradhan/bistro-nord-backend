import { ScanDB, ScanAllDBItems } from "../core/dynamodb/dynamoInteractor.mjs";

import middy from "@middy/core";
import validator from "@middy/validator";
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from "@middy/http-error-handler";
import { getMenuItemsSchema as Request } from "../core/middleware/RequestValidation.mjs";
import { getMenuItemsSchema as Response } from "../core/middleware/ResponseValidation.mjs";

const getMenuItems = async (event) => {
    if (event.queryStringParameters.ItemType === 'All' ) {
        console.log("ItemType: ", event.queryStringParameters.ItemType)
        try {
            const GetAllMenuItems = await ScanAllDBItems();
            let Menu = [];
            for ( let i = 0; i <=GetAllMenuItems.Count - 1 ; i++ ) {
                Menu.push({
                    Price: Number(GetAllMenuItems.Items[i].Price.S),
                    Description: GetAllMenuItems.Items[i].Description.S,
                    ImageLink: GetAllMenuItems.Items[i].ImageLink.S,
                    MenuItem: GetAllMenuItems.Items[i].MenuItem.S,
                    MenuItemType: GetAllMenuItems.Items[i].MenuItemType.S
                })
            }
            return {
                statusCode: 200,
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    Menu
                )
            } 
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
              } 
        }
    }
    else {
        console.log("ItemType: ", event.queryStringParameters.ItemType)
        const  EAN = {
            "#MI": "MenuItem",
            "#D": "Description",
            "#I": "ImageLink",
            "#MT": "MenuItemType",
            "#P": "Price"
    
        }
        const EAV = {
            ":mt": {
                "S": event.queryStringParameters.ItemType
            }
        }
        const FilExp = "MenuItemType = :mt"
        const ProjExp= "#MI, #D, #I, #MT, #P"
        try {
            const GetMenuItems = await ScanDB(EAN, EAV, FilExp, ProjExp);
            let Menu = [];
            for ( let i = 0; i <=GetMenuItems.Count - 1 ; i++ ) {
                Menu.push({
                    Price: Number(GetMenuItems.Items[i].Price.S),
                    Description: GetMenuItems.Items[i].Description.S,
                    ImageLink: GetMenuItems.Items[i].ImageLink.S,
                    MenuItem: GetMenuItems.Items[i].MenuItem.S,
                    MenuItemType: GetMenuItems.Items[i].MenuItemType.S
                })
            }
            return {
                statusCode: 200,
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    Menu
                )
            } 
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
            } 
        }
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
