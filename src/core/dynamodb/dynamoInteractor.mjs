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

    static async PutDBItem(Item) {
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

    static async CheckIfBookingExists(BookingRef) {
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

    static async GetLastId() {
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

    static async IncrementLastId(ItemCount) {
        const IncrementValue = Number(ItemCount) + 1
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
