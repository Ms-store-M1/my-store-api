const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  async function createCheckoutSession(req, res) {
    try {
        const cartItems = req.body.cart; // Le corps de la requête contient les articles du panier
        const lineItems = cartItems.map(item => {
          return {
            price_data: {
              currency: 'eur',
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.price * 100),
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
        res.status(500).json({ error: error.message });
      }
  }
  

module.exports = {
    createCheckoutSession,
}