export const BookATableSchema = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          fname: { type: "string" },
          lname: { type: "string" },
          email: { type: "string", format: "email" },
          datetime: { type: "string"},
          count: { type: "string", pattern: "^[1-9]?$|^8$" },
          restaurantId: {
                "type": "string",
                "enum": [
                    "OTTA",
                    "CHARL",
                    "EDMON",
                    "FRED",
                    "HALI",
                    "IQAL",
                    "QUEB",
                    "TORON"
                ]
            },
            status: {
                "type": "string",
                "enum": [
                    "TENTATIVE",
                    "ACTIVE"
                ]
            }
        },
        required: [ "fname", "lname", "email", "datetime", "count", "restaurantId", "status" ]
      }
    }
};
export const UpdateReservationSchema = {
    type: "object",
    properties: {
      body: {
        type: "object",
        properties: {
          datetime: { type: "string"},
          count: { type: "string", pattern: "^[1-9]?$|^8$" },
            status: {
                "type": "string",
                "enum": [
                    "TENTATIVE",
                    "ACTIVE",
                    "IN_PROGRESS"
                ]
            }
      },
      required: [ "status" ]
    }
  }
};
// export const UpdateReservationSchema = {
//     type: "object",
//     properties: {
//       body: {
//         type: "object",
//         properties: {
//             datetime: { type: "string"},
//             count: { type: "number" },
//             status: {
//                 "type": "string",
//                 "enum": [
//                     "TENTATIVE",
//                     "ACTIVE",
//                     "IN_PROGRESS"
//                 ]
//             }
//         },
//         required: [ "status"]
//       }
//     }
// };

export const GetAReservationSchema = {
  type:"object",
  properties:{
    pathParameters:{
      type:"object",
      properties:{
        OrderId: { "type":"string", pattern: "[A-Z]{4}[0-9]{5,}" }
      },
      required:["OrderId"]
    }
  },
  required:["pathParameters"]
};

export const GetUsersReservationsSchema = {
  type:"object",
  properties:{
    pathParameters:{
      type:"object",
      properties:{
        UserId: { "type":"string", format: "email" }
      },
      required:["UserId"]
    }
  },
  required:["pathParameters"]
};

export const DoneWithAReservationSchema = {
  type:"object",
  properties:{
    pathParameters:{
      type:"object",
      properties:{
        OrderId: { "type":"string", pattern: "[A-Z]{4}[0-9]{5,}" },
        Status: { 
          "type":"string",
          "enum": [
                    "COMPLETE",
                    "CANCELLED",
                ] 
        }
      },
      required:["OrderId", "Status"]
    }
  },
  required:["pathParameters"]
};

export const addAddMenuItemSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        MenuItem: { type: "string" },
        Description: { type: "string" },
        ImageLink: { type: "string" },
        Price: { 
          "type": "number",   
          "minimum": 0,
          "maximum": 100
        }
      },
      required: [ "MenuItem", "Description", "ImageLink", "Price"]
    }
  }
};

// export const RestaurantIdMap = {
//     "OTTAWA": {
//         Code: "OTTA",
//         Address: "80 Wellington Street Ottawa, ON K1P 5K9",
//         Flagship: true
//     },
//     "CHARLOTTETOWN": {
//         Code: "CHRL",
//         Address: "95 Rochford St, Charlottetown, PE C1A 3T5",
//         Flagship: false
//     },
//     "EDMONTON": {
//         Code: "EDMN",
//         Address: "307 Legislature Building 10800 - 97 Avenue Edmonton, Alberta T5K 2B6",
//         Flagship: false
//     },
//     "FREDERICTON": {
//         Code: "FRED",
//         Address: "675 King St, Fredericton, NB E3B 1G1",
//         Flagship: false
//     },
//     "HALIFAX": {
//         Code: "HALI",
//         Address: "One Government Place, 1713 Barrington St, Halifax, NS B3J 2A4",
//         Flagship: false
//     },
//     "IQALUIT": {
//         Code: "IQAL",
//         Address: "Office of the Premier Iqaluit, NU X0A 0H0",
//         Flagship: false
//     },
//     "QUEBEC_CITY": {
//         Code: "QBCT",
//         Address: "835 Bd René-Lévesque E 3e étage, Québec, QC G1A 1B4",
//         Flagship: false
//     },
//     "TORONTO": {
//         Code: "TNTO",
//         Address: "Premier of Ontario Legislative Building Queen's Park Toronto ON M7A 1A1",
//         Flagship: false
//     },
// }
