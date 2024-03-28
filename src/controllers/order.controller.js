/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { userId } = req.params;
  const {
    deliveryMode, deliveryAddress, paymentToken, orderNumber,
  } = req.body;

  try {
    // Récupérer le panier
    const cartItems = await prisma.cart.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { product: true },
    });

    // Calcul du totalItems et totalAmount
    let totalItems = 0;
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalItems += item.quantity;
      totalAmount += item.product.price * item.quantity;
    });

    // Création de la commande
    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId, 10),
        products: { create: cartItems.map((item) => ({ productId: item.productId, quantity: item.quantity })) },
        deliveryMode,
        deliveryAddress: deliveryMode === 'livraison à domicile' ? deliveryAddress : null,
        paymentToken,
        orderNumber,
        totalAmount,
        totalItems,
        orderDate: new Date(),
        status: 'payé', // Statut initial de la commande
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

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

const calculateTotalAmount = (cartItems) => cartItems.reduce((total, cartItem) => total + (cartItem.product.price * cartItem.quantity), 0);

const calculateTotalItems = (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

module.exports = {
  createOrder,
};
