export const BookATableSchema = {
    type: "object",
    required: ["statusCode", "val", "message"],
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
};

export const UpdateReservationSchema = {
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
};

export const GetAReservationSchema = {
  type: "object",
  required: ["statusCode"],
  properties: {
    body: {
      type: "object",
      properties: {
        val: { type: "string" },
        Details: { type: "string"}
      }
    },
    statusCode: {
      type: "number",
    },
    headers: {
      type: "object",
    },
  },
};

export const GetUsersReservationsSchema = {
  type: "object",
  required: ["statusCode"],
  properties: {
    body: {
      type: "object",
      properties: {
        val: { type: "string" },
        Details: { type: "string"}
      }
    },
    statusCode: {
      type: "number",
    },
    headers: {
      type: "object",
    },
  },
};

export const DoneWithAReservationSchema = {
  type: "object",
  required: ["statusCode"],
  properties: {
    body: {
      type: "object",
      properties: {
        val: { type: "string" },
        Details: { type: "string"}
      }
    },
    statusCode: {
      type: "number",
    },
    headers: {
      type: "object",
    },
  },
};

export const addAddMenuItemSchema = {
  type: "object",
  required: ["statusCode", "val", "message"],
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
};

export const getMenuItemsSchema = {
  type: "object",
  required: ["statusCode"],
  properties: {
    body: {
      type: "object",
      properties: {
        val: { type: "string" },
        Details: { type: "string"}
      }
    },
    statusCode: {
      type: "number",
    },
    headers: {
      type: "object",
    },
  },
};

