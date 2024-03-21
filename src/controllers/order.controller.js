const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { userId } = req.params;
  const { deliveryMode, deliveryAddress, paymentDetails } = req.body;

  try {
    let orderUser = null;

    // si l'user est connecté
    if (userId) {
      orderUser = await prisma.user.findUnique({
        where: { id: parseInt(userId, 10) },
      });
    }

    // si l'user n'est pas connecté
    if (!orderUser) {
      // On verifie si l'user est inscrit mais non connecté
      const { email } = req.body;
      const userExists = await prisma.user.findFirst({
        where: { mail: email },
      });

      if (userExists) {
        // Redirection  vers la page de connexion s'il l'utilisateur est inscrit
        return res.status(400).json({ message: "Veuillez vous connecter pour passer une commande" });
      } else {
        // Si l'user est non inscrit, redirection vers la page d'inscription
        return res.status(400).json({ message: "Veuillez vous inscrire pour passer une commande" });
      }
    }

    // Récupérer le panier de l'utilisateur
    const cartItems = await prisma.cart.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { product: true },
    });

    // Création de la commande 
    const order = await prisma.order.create({
      data: {
        userId: orderUser.id,
        products: { create: cartItems.map(item => ({ productId: item.productId, quantity: item.quantity })) },
        deliveryMode,
        deliveryAddress: deliveryMode === "livraison à domicile" ? deliveryAddress : null,
        paymentDetails,
      },
    });

    // Vider le panier de l'utilisateur
    await prisma.cart.deleteMany({ where: { userId: orderUser.id } });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
};
