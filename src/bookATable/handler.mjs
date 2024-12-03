// exports.BookATable = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: JSON.parse(event.body)['verified_account'],
//     }),
//   };
// };
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

export const BookATable = async (event) => {
  const client = new DynamoDBClient({ region: "us-east-1" });
  const command = new ListTablesCommand({});
  const results = await client.send(command);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: JSON.parse(results),
    }),
  };
};
