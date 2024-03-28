const createOrder = async (req, res) => {
  const { userId } = req.params;
  const { deliveryMode, deliveryAddress, paymentToken, orderNumber } = req.body;

  try {
    // Récupérer le panier 
    const cartItems = await prisma.cart.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { product: true },
    });

    // Calcul du totalItems et totalAmount
    let totalItems = 0;
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalItems += item.quantity;
      totalAmount += item.product.price * item.quantity;
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
