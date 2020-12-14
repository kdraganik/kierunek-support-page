exports.handler = async (event, _context, callback) => {
  const posId = process.env.POS_ID;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const data = await JSON.parse(event.body);

  const accessToken = await getAccessToken(clientId, clientSecret);
  const redirectUrl = await createOrder(accessToken, posId, data);
  
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

const createOrder = async (accessToken, posId, reqData) => {
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
      "continueUrl": "https://wspieram.kosciolkierunek.pl/success.html",
      "customerIp": "127.0.0.1",
      "merchantPosId": "${posId}",
      "description": "Kosciol Kierunek - wsparcie",
      "currencyCode": "PLN",
      "totalAmount": "${ reqData.amount * 100 }",
      "buyer": {
          "email": "${reqData.email}",
          "firstName": "${reqData.name.split(' ')[0]}",
          "lastName": "${reqData.name.split(' ')[reqData.name.split(' ').length - 1]}",
          "language": "pl"
      },
      "products": [
          {
              "name": "Wsparcie",
              "unitPrice": "${ reqData.amount * 100 }",
              "quantity": "1"
          }
      ]
    }`
  });

  const data = await JSON.parse(response);

  return data.redirectUri;
}