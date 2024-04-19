const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function createCheckoutSession(req, res) {
  try {
    const { cart } = req.body;
    const lineItems = cart.map((item) => {
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.product.name,
            images: [item.product.thumbnail],
          },
          unit_amount: Math.round(Number(item.product.price) * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    res.json({ url: session.url }); // Envoyer l'URL de paiement au front-end
  } catch (error) {
    console.error('Erreur lors de la création de la session Stripe:', error);
    res.status(500).json({ error: error.message });
  }
}

const webhook = async (req, res) => {

  const sig = req.headers['stripe-signature'];

  let event;
  try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Paiement réussi:', paymentIntent.id);
      break;
    case 'payment_intent.payment_failed':
      const paymentFailed = event.data.object;
      console.log('Échec de paiement:', paymentFailed.id);
      break;
    default:
      console.log('Événement non géré:', event.type);
  }
  res.json({ received: true });
};

const confirmOrder = async (req, res) => {
  const { session_id } = req.query;

    if (!session_id) {
        return res.status(400).json({ message: "Session ID is required" });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['payment_intent'] 
        });

        res.json({
            id: session.id,
            payment_status: session.payment_status,
            amount_total: session.amount_total
        });
    } catch (error) {
        console.error('Failed to retrieve session:', error);
        res.status(500).json({ message: "Failed to retrieve order details" });
    }
};

module.exports = {
  createCheckoutSession,
  webhook,
  confirmOrder,
}