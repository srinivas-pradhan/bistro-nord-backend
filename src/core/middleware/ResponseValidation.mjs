export const BookATableSchema = {
    type: "object",
    required: ["statusCode"],
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
