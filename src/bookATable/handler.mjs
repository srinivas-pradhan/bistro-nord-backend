import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

export const BookATable = async (event) => {
  const client = new DynamoDBClient({ region: process.env.AWS_DEFAULT_REGION });
  // Check if the same user has same reservation, time, location already in place.
    // Logic - Find bookingDatetime reference using BookingDateTime and then find the userID

  //If so - return relevant error code and cancel adding the booking.
  // If not then
  // Get the LastID using the GetItemCommand
  // Increment the LASTID + 1 and then set that as the new booking ID.
  // Add the data to the DynamoDB table.
 
  const command = new PutItemCommand({
    "Item" : {
      "BookingId": {
        "S": "10000"
      },
      "BookingRef": {
        "S": "OTTA_srinivaspradhan@gmail.com_1735752600"
      },
      "BookingNumber": {
        "N": "OTTA_10000"
      },
      "RestaurantID": {
        "S": "OTTA"
      },
      "BookingDateTime": {
        "S": "1735752600"
      },
      "UserID": {
        "S": "srinivaspradhan@gmail.com"
      },
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

};
