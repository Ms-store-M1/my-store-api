const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  async function createCheckoutSession(req, res) {
    try {
      const {cart} = req.body;
      console.log(req.body); // Pour voir tout le corps de la requête
      console.log(req.body.cart);
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
        success_url: `${process.env.FRONTEND_URL}/success.html`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel.html`,
      });

      res.json({ url: session.url }); // Envoyer l'URL de paiement au front-end
    } catch (error) {
      console.error('Erreur lors de la création de la session Stripe:', error);
      res.status(500).json({ error: error.message });
    }
  }
  

module.exports = {
    createCheckoutSession,
}