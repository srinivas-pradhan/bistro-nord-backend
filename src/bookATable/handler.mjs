// exports.BookATable = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: JSON.parse(event.body)['verified_account'],
//     }),
//   };
// };
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

export const BookATable = async (event) => {
  const client = new DynamoDBClient({ region: process.env.AWS_DEFAULT_REGION });
  // const command = new PutItemCommand({});
  // const results = await client.send(command);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: {
        "REGION": process.env.AWS_DEFAULT_REGION
      },
    }),
  };
};
