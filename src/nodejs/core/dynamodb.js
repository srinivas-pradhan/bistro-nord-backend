import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

export const BookTableDB = async (db_name, curr_region, data={}) => {
  const client = new DynamoDBClient({ region: curr_region });
  const command = new PutItemCommand({
    Item : {
      'BookingId' : "O12345",
      'Datetime' : 1733410897 
    }
  });
  try {
    const results = await client.send(command);
    return results
  } catch (error) {
    console.log(error)
  }

}
