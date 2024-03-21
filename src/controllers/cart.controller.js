const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const userIntId = parseInt(userId, 10);
        
        const cartItems = await prisma.cart.findMany({
            where: { userId: userIntId },
            include: {
                product: true
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
        
        const cartItem = await prisma.cart.create({
            data: {
                userId: userIntId,
                productId: productIntId,
                quantity: quantity
            }
        });
        
        res.json(cartItem);
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
                    productId: productIntId
                }
            },
            data: {
                quantity: quantity
            }
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
                    productId: productIntId
                }
            }
        });
        
        res.json({ message: 'Produit supprimé du panier avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeProductFromCart
};
