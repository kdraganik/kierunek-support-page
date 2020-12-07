const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const amount = data.amount * 100

  const session = await stripe.checkout.sessions.create({
    submit_type: 'donate',
    mode: 'payment',
    locale: "pl", 
    payment_method_types: ['card', 'p24'],
    billing_address_collection: 'auto',
    success_url: `${process.env.URL}/polityka.html`,
    cancel_url: process.env.URL,
    line_items: [
      {
        name: 'Wsparcie działań kościoła',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet a ipsum eu imperdiet.',
        images: ['https://test.kosciolkierunek.pl/logo_black.svg'],
        amount: amount,
        currency: 'pln',
        quantity: 1,
      },
    ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id
    }),
  };
}