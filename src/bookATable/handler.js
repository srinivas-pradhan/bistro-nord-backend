exports.BookATable = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: JSON.parse(event.body)['verified_account'],
    }),
  };
};
