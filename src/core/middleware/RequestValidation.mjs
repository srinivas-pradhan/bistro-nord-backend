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
          count: { type: "number" },
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
            }
        },
        required: [ "fname", "lname", "email", "datetime", "count", "restaurantId" ]
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
//         Code: "CHARL",
//         Address: "95 Rochford St, Charlottetown, PE C1A 3T5",
//         Flagship: false
//     },
//     "EDMONTON": {
//         Code: "EDMON",
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
//         Code: "QUEB",
//         Address: "835 Bd René-Lévesque E 3e étage, Québec, QC G1A 1B4",
//         Flagship: false
//     },
//     "TORONTO": {
//         Code: "TORON",
//         Address: "Premier of Ontario Legislative Building Queen's Park Toronto ON M7A 1A1",
//         Flagship: false
//     },
// }
