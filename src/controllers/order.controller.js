const createOrder = async (req, res) => {
  const { userId } = req.params;
  const { deliveryMode, deliveryAddress, paymentToken, orderNumber, totalAmount, totalItems } = req.body; // Ajoutez les nouveaux champs reçus

  try {
    // Récupérer le panier 
    const cartItems = await prisma.cart.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { product: true },
    });

    // Création de la commande
    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId, 10),
        products: { create: cartItems.map(item => ({ productId: item.productId, quantity: item.quantity })) },
        deliveryMode,
        deliveryAddress: deliveryMode === "livraison à domicile" ? deliveryAddress : null,
        paymentToken,
        orderNumber,
        totalAmount,
        totalItems,
        orderDate: new Date(), 
        status: "payé" // Statut initial de la commande
      },
    }); 
    // Vider le panier 
    await prisma.cart.deleteMany({ where: { userId: parseInt(userId, 10) } });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
