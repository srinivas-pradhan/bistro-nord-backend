export const BookATableSchema = {
    type: "object",
    required: ["body", "statusCode"],
    properties: {
      body: {
        type: "string",
      },
      statusCode: {
        type: "number",
      },
      headers: {
        type: "object",
      },
    },
  };
