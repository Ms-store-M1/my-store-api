const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const userIntId = parseInt(userId, 10);

    const cartItems = await prisma.cart.findMany({
      where: { userId: userIntId },
      include: {
        product: true,
      },
    });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const userIntId = parseInt(userId, 10);
    const productIntId = parseInt(productId, 10);
    const quantityInt = parseInt(quantity, 10);

    // Vérifier si le produit est déjà dans le panier de l'utilisateur
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: userIntId,
          productId: productIntId,
        },
      },
    });

    if (existingCartItem) {
      // Si le produit existe déjà, mettre à jour la quantité
      const updatedCartItem = await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantityInt },
      });
      
      return res.json(updatedCartItem);
    } else {
      // Si le produit n'existe pas, créer une nouvelle entrée dans le panier
      const cartItem = await prisma.cart.create({
        data: {
          userId: userIntId,
          productId: productIntId,
          quantity: quantityInt,
        },
      });
      
      return res.json(cartItem);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateCartItemQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const userIntId = parseInt(userId, 10);
    const productIntId = parseInt(productId, 10);

    const cartItem = await prisma.cart.update({
      where: {
        userId_productId: {
          userId: userIntId,
          productId: productIntId,
        },
      },
      data: {
        quantity,
      },
    });

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const userIntId = parseInt(userId, 10);
    const productIntId = parseInt(productId, 10);

    await prisma.cart.delete({
      where: {
        userId_productId: {
          userId: userIntId,
          productId: productIntId,
        },
      },
    });

    res.json({ message: 'Produit supprimé du panier avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const userIntId = parseInt(userId, 10);

    await prisma.cart.deleteMany({
      where: { userId: userIntId },
    });

    res.json({ message: 'Tous les produits ont été supprimés du panier avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeProductFromCart,
  clearCart,
};
