const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { userId } = req.params;
  const { deliveryMode, deliveryAddress, paymentDetails } = req.body;

  try {
    // Récupérer le panier de l'utilisateur
    const cartItems = await prisma.cart.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { product: true },
    });

    // Créer la commande
    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId, 10),
        products: { create: cartItems.map(item => ({ productId: item.productId, quantity: item.quantity })) },
        deliveryMode,
        deliveryAddress,
        paymentDetails,
      },
    });

    // Vider le panier de l'utilisateur
    await prisma.cart.deleteMany({ where: { userId: parseInt(userId, 10) } });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
};
