const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const amount = data.amount * 100

  const session = await stripe.checkout.sessions.create({
    submit_type: 'donate',
    mode: 'payment',
    locale: "pl",
    payment_method_types: ['p24', 'card'],
    billing_address_collection: 'auto',
    success_url: `${process.env.URL}/success.html`,
    cancel_url: process.env.URL,
    line_items: [
      {
        name: 'Wsparcie działań kościoła',
        description: 'Wprowadź 4242 4242 4242 4242 (success), 4000 0025 0000 3155 (auth) lub 4000 0000 0000 9995 (fail) oraz dowolny cvc żeby kontynuować.',
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