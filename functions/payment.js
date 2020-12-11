exports.handler = async (event, _context, callback) => {

  const accessToken = await getAccessToken();

  // production
  // const posId = process.env.POS_ID;  
  //sandbox
  const posId = '145227';
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      accessToken,
      posId
    }),
  };
};

const getAccessToken = async () => {
  var request = require('request-promise');

  // production
  // const clientId = process.env.CLIENT_ID;
  // const clientSecret = process.env.CLIENT_SECRET;

  //sandbox
  const clientId = '145227';
  const clientSecret = '12f071174cb7eb79d4aac5bc2f07563f';

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