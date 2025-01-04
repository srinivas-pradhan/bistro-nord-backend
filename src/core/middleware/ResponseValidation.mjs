export const BookATableSchema = {
    type: "object",
    required: ["statusCode","headers"],
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
