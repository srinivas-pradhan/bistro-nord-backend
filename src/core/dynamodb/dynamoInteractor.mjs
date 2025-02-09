'use strict';

import { 
    DynamoDBClient, 
    PutItemCommand, 
    GetItemCommand,
    QueryCommand,
    UpdateItemCommand,
    ScanCommand,
    DeleteItemCommand
} from "@aws-sdk/client-dynamodb";

const Region = process.env.AWS_DEFAULT_REGION;
const Book_Table = process.env.TABLE_NAME;
// const Done_Table = process.env.DONE_TABLE_NAME || null

const client = new DynamoDBClient({ region: Region });

export const PutDBItem = async function PutDBItem(Item, Table = Book_Table) {
    const command = new PutItemCommand({
        "Item": Item,
        "TableName": Table
    });
    try {
        const results = await client.send(command);
        return results
        
    } catch (error) {
        console.log(error)
        return error.name
    }
};

export const QueryDBUsingBookingNumber = async function QueryDBUsingBookingNumber(Index, Val, Table = Book_Table) {
    const input = {
        "TableName": Table,
        "IndexName": Index,
        "Select": "ALL_ATTRIBUTES",
        ExpressionAttributeNames: {
            '#key': Index
        },
        "ExpressionAttributeValues": {
            ":value": {
              "S": Val
            }
        },
        "KeyConditionExpression": '#key = :value',
    };
    const command = new QueryCommand(input);
    try {
        const results = await client.send(command);
        return results
        
    } catch (error) {
        console.log(error)
        return error.name
    }
}

export const UpdateDBItem = async function UpdateDBItem (EAN, EAV, UpdateExp, QKey, Table = Book_Table){
    const input = {
        TableName: Table,
        Key: QKey,
        ExpressionAttributeNames: EAN,
        ExpressionAttributeValues: EAV,
        ReturnValues: "ALL_NEW",
        UpdateExpression: UpdateExp

    }
    const command = new UpdateItemCommand(input);
    try {
        const results = await client.send(command);
        return results
        
    } catch (error) {
        console.log(error)
        return error.name
    }
};

export const ScanDB = async function ScanDB (EAN, EAV, FilExp, ProjExp, Table = Book_Table){
    const command = new ScanCommand({
        ExpressionAttributeNames: EAN,
        ExpressionAttributeValues: EAV,
        FilterExpression: FilExp,
        ProjectionExpression: ProjExp,
        TableName: Table
    })
    try {
        const results = await client.send(command);
        return results

    } catch (error) {
        console.log(error)
        return error.name
    }
}

export const DeleteItem = async function DeleteItem (Key, Table = Book_Table) {
    const command = new DeleteItemCommand({
        "Key": {
            "BookingRef": {
              "S": Key
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
}

export const CheckIfBookingExists = async function CheckIfBookingExists(BookingRef, Table = Book_Table) {
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

export const GetLastId = async function GetLastId(Table = Book_Table) {
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

export const IncrementLastId = async function IncrementLastId(ItemCount, Table = Book_Table) {
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

