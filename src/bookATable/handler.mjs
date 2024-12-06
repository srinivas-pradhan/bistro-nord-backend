import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

export const BookATable = async (event) => {
  const client = new DynamoDBClient({ region: process.env.AWS_DEFAULT_REGION });
  const input = {
    "Item": {
      "AlbumTitle": {
        "S": "Somewhat Famous"
      },
      "Artist": {
        "S": "No One You Know"
      },
      "SongTitle": {
        "S": "Call Me Today"
      }
    },
    "ReturnConsumedCapacity": "TOTAL",
    "TableName": process.env.TABLE_NAME
  };
  const command = new PutItemCommand({
    "Item" : {
      "BookingId": {
        "S": "OTTA12345"
      },
      "Datetime": {
        "N": 1733410897
      }
    },
    "TableName": process.env.TABLE_NAME
  });
  try {
    const results = await client.send(command);
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: results
      })
    }
  } catch (error) {
    console.log(error)
  }
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: {
  //       "REGION": process.env.AWS_DEFAULT_REGION,
  //       "DYNAMO_TABLE": process.env.TABLE_NAME,
  //       "event": event
  //     },
  //   }),
  // };
};
// import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// const BookTableDB = async (db_name, curr_region, data={}) => {
//   const client = new DynamoDBClient({ region: curr_region });
//   const command = new PutItemCommand({
//     Item : {
//       'BookingId' : "O12345",
//       'Datetime' : 1733410897 
//     }
//   });
//   try {
//     const results = await client.send(command);
//     return results
//   } catch (error) {
//     console.log(error)
//   }

// }
