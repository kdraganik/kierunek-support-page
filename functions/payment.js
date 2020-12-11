exports.handler = async (event, _context, callback) => {
  const posId = process.env.POS_ID;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const accessToken = await getAccessToken(clientId, clientSecret);
  const redirectUrl = await createOrder(accessToken, posId);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      redirectUrl
    }),
  };
};

const getAccessToken = async (clientId, clientSecret) => {
  var request = require('request-promise');

  try{
    const response = await request({
      method: 'POST',
      url: 'https://secure.payu.com/pl/standard/user/oauth/authorize',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    });

    const data = await JSON.parse(response);

    return data.access_token
  }
  catch(err){
    console.log(err);
  }
}

const createOrder = async (accessToken, posId) => {
  var request = require('request-promise');

  const response = await request({
    method: 'POST',
    url: 'https://secure.payu.com/api/v2_1/orders',
    simple: false,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: `{
      "notifyUrl": "https://your.eshop.com/notify",
      "customerIp": "127.0.0.1",
      "merchantPosId": "${posId}",
      "description": "RTV market",
      "currencyCode": "PLN",
      "totalAmount": "21000",
      "buyer": {
          "email": "john.doe@example.com",
          "phone": "654111654",
          "firstName": "John",
          "lastName": "Doe",
          "language": "pl"
      },
      "products": [
          {
              "name": "Wireless Mouse for Laptop",
              "unitPrice": "15000",
              "quantity": "1"
          },
          {
              "name": "HDMI cable",
              "unitPrice": "6000",
              "quantity": "1"
          }
      ]
    }`
  });

  const data = await JSON.parse(response);

  console.log(data);

  return data.redirectUri;
}