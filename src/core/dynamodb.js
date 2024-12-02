// import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb"; // ES Modules import

exports.BookATable = async (event) => {
    const client = new DynamoDBClient();
    const input = { // ListTablesInput
        ExclusiveStartTableName: "BookATable",
        Limit: Number("3"),
    };
    const command = new ListTablesCommand(input);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: JSON.parse(command),
      }),
    };
  };

