'use strict';

import { 
    DynamoDBClient, 
    PutItemCommand, 
    GetItemCommand 
} from "@aws-sdk/client-dynamodb";

const Region = process.env.AWS_DEFAULT_REGION;
const Table = process.env.TABLE_NAME;
const client = new DynamoDBClient({ region: Region });

export const PutDBItem = async function PutDBItem(Item) {
    const command = new PutItemCommand({
        "Item": Item,
        "TableName": Table
    });
    try {
        const results = await client.send(command);
        return results
        console.log(error)
    } catch (error) {
        return error.name
    }
};

export const CheckIfBookingExists = async function CheckIfBookingExists(BookingRef) {
    const command = new GetItemCommand({
        "Key": {
            "BookingRef": {
                "S": BookingRef
            }
        },
        "TableName": Table
    })
    try {
        const results = await client.send(command);
        return results
    } catch (error) {
        console.log(error)
        return error.name
    }
};

export const GetLastId = async function GetLastId() {
    const command = new GetItemCommand({
        "Key": {
            "BookingRef": {
                "S": "UserMetadata"
            }
        },
        "TableName": Table
    })
    try {
        const results = await client.send(command);
        return results
    } catch (error) {
        console.log(error);
        return error.name
    }
};

export const IncrementLastId = async function IncrementLastId(ItemCount) {
    const command = new PutItemCommand({
        "Item": {
            "BookingRef": {
                "S": "UserMetadata"
            },
            "Count": {
                "S": ItemCount
            }
        },
        "TableName": Table
    });
    try {
        const results = await client.send(command);
        return results
    } catch (error) {
        console.log(error);
        return error.name
    }
};
