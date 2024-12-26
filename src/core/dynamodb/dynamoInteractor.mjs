import { 
    DynamoDBClient, 
    PutItemCommand, 
    GetItemCommand 
} from "@aws-sdk/client-dynamodb";

export class DynamoInteractor {
    constructor(Region, Table) {
        this.Region = Region;
        this.Table = Table;
    }
    client = new DynamoDBClient({ region: this.Region });

    static PutDBItem = async function PutDBItem(Item) {
        const command = new PutItemCommand({
            "Item": Item,
            "TableName": this.Table
        });
        try {
            const results = await client.send(command);
            return results
        } catch (error) {
            console.log(error)
            return error.name
        }
    };

    static CheckIfBookingExists = async function CheckIfBookingExists(BookingRef) {
        const command = new GetItemCommand({
            "Key": {
                "S": BookingRef
            },
            "TableName": this.Table
        })
        try {
            const results = await client.send(command);
            return results
        } catch (error) {
            console.log(error)
            return error.name
        }
    };

    static GetLastId = async function GetLastId() {
        const command = new GetItemCommand({
            "Key": {
                "S": "UserMetadata"
            },
            "TableName": this.Table
        })
        try {
            const results = await client.send(command);
            return results
        } catch (error) {
            console.log(error);
            return error.name
        }
    };

    static IncrementLastId = async function IncrementLastId(ItemCount) {
        var IncrementValue = Number(ItemCount) + 1
        const command = new PutItemCommand({
            "Item": {
                "BookingRef": {
                    "S": IncrementValue
                }
            },
            "TableName": this.Table
        });
        try {
            const results = await client.send(command);
            return results
        } catch (error) {
            console.log(error);
            return error.name
        }
    };
};


