/* eslint-disable indent */
/* eslint-disable quotes */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const throwError = require("../utils/throwError");
const { sendEmail } = require('../controllers/nodemailer.controller');


const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            const err = throwError("No user id provided", 404);
            next(err);
        }
        const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        commande: true,
        wishlist: true,
      },
    });
    if (!user) {
      const err = throwError('User not found', 404);
      return next(err);
    }
    return res.json(
      {
        data: user,
        sucess: true,
      },
    );
  } catch (err) {
    return next(err);
  }
};

const createUser = async (req, res) => {
    try {
        const { password, ...userData } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });

        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: "5h",
        });

        // Envoi d'un e-mail de confirmation à l'utilisateur
        const userSubject = 'Confirmation d\'inscription';
        const userText = `Bonjour ${userData.firstname}, merci pour votre inscription sur notre site.`;
        await sendEmail(userData.mail, userSubject, userText);
                
        // Envoi d'un e-mail à l'administrateur
        const adminSubject = 'Nouvelle inscription sur le site';
        const adminText = `${userData.firstname} ${userData.lastname} s'est inscrit sur le site avec l'adresse e-mail : ${userData.mail}.`;
        await sendEmail('mystore.noreply2@gmail.com', adminSubject, adminText);

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, ...userData } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: {
                ...userData,
            },
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const userId = Number(req.params.id);
    if (!userId) {
        return res.status(400).json({ message: "ID invalide" });
    }

    try {
        // Suppression des dépendances
        await prisma.cart.deleteMany({ where: { userId } });
        await prisma.order.deleteMany({ where: { userId } });
        // Ajoutez ici des suppressions similaires pour `commande` et `wishlist` si nécessaire

        // Suppression de l'utilisateur
        await prisma.user.delete({
            where: { id: userId },
        });

        return res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const addtoWishlist = async (req, res) => {
    try {
        console.log(req.params);
        const { userId, productId } = req.params;

        // Convertir userId en entier
        const userIdInt = parseInt(userId, 10);

        const product = await prisma.product.findUnique({
            where: { id: Number(productId) },
        });

        if (!product) {
            res.status(404).json({ message: "Produit non trouvé" });
        }

        await prisma.user.update({
            where: { id: userIdInt },
            data: {
                wishlist: {
                    connect: { id: Number(productId) },
                },
            },
        });

        res.json({ message: "Produit ajouté à la wishlist avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getorders = async (req, res) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const { userId } = req.params;
        const orders = [];

        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addtoWishlist,
    getorders,
};
