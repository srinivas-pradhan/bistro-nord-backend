export const BookATableSchema = {
    type: "object",
    required: ["statusCode"],
    properties: {
      body: {
        type: "object",
        properties: {
          val: { type: "string" },
          message: { type: "string"}

        }

      },
      statusCode: {
        type: "number",
      },
      headers: {
        type: "object",
      },
    },
    required: [ "val", "message"]
};

export const UpdateReservationSchema = {
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
