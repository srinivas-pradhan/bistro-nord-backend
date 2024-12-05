import { BookTableDB } from "@opt/nodejs/core/dynamodb.js";

export const BookATable = async (event) => {
  const client = new DynamoDBClient({ region: process.env.AWS_DEFAULT_REGION });
  // const command = new PutItemCommand({});
  // const results = await client.send(command);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: {
        "REGION": process.env.AWS_DEFAULT_REGION,
        "DYNAMO_TABLE": process.env.TABLE_NAME
      },
    }),
  };
};
