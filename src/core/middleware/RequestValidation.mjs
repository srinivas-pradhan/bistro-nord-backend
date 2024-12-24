export const BookATableSchema = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          fname: { type: "string" },
          lname: { type: "string" },
          email: { type: "string", format: "email" },
          datetime: { type: "number"},
          count: { type: "number" }
        },
        required: [ "fname", "lname", "email", "datetime", "count" ]
      }
    }
};
