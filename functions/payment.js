exports.handler = (event, _context, callback) => {
  console.log({ event });

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ task: "Redirect data to payU API...", dataToSend:  event.body})
  });
};