const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { userId } = req.params;
  const { deliveryMode, deliveryAddress, paymentToken } = req.body;

  try {
    // Récupérer le panier 
    const cartItems = await prisma.cart.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { product: true },
    });

    // Création de la cmd
    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId, 10),
        products: { create: cartItems.map(item => ({ productId: item.productId, quantity: item.quantity })) },
        deliveryMode,
        deliveryAddress: deliveryMode === "livraison à domicile" ? deliveryAddress : null,
        paymentToken,
        orderNumber: generateOrderNumber(), 
        totalAmount: calculateTotalAmount(cartItems), 
        totalItems: calculateTotalItems(cartItems), 
        orderDate: new Date(), // Date de commande actuelle
        status: "payé" // Statut initial de la cmd
      },
    }); 
    // Vider le panier 
    await prisma.cart.deleteMany({ where: { userId: parseInt(userId, 10) } });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const orderConfirmation = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId, 10) },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId, 10) },
    });

    if (!order) {
      return res.status(404).json({ message: `Order with id ${orderId} not found` });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const generateOrderNumber = () => {
  const randomString = Math.random().toString(36).substring(2, 10).toUpperCase();
  const timestamp = Date.now().toString().substring(6);
  return `ORDER-${randomString}-${timestamp}`;
};

const calculateTotalAmount = (cartItems) => {
  return cartItems.reduce((total, cartItem) => {
    return total + (cartItem.product.price * cartItem.quantity);
  }, 0);
};

const calculateTotalItems = (cartItems) => {
  return cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity;
  }, 0);
};


module.exports = {
  createOrder,
  orderConfirmation,
  getOrderById,
  getOrders,
};
