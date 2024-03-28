const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const throwError = require('../utils/throwError');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     description: Retourne une liste de tous les utilisateurs.
 *     responses:
 *       200:
 *         description: Une liste de tous les utilisateurs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
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
      const err = throwError('No user id provided', 404);
      next(err);
    }
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
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

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     description: Enregistre un nouvel utilisateur dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */
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
      expiresIn: '5h',
    });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Met à jour un utilisateur
 *     description: Met à jour les informations d'un utilisateur existant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
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

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     description: Supprime un utilisateur de la base de données par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /users/{userId}/wishlist/{productId}:
 *   post:
 *     summary: Ajoute un produit à la wishlist d'un utilisateur
 *     description: Ajoute un produit spécifié par son ID à la wishlist d'un utilisateur par son ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produit ajouté à la wishlist avec succès
 *       404:
 *         description: Produit ou utilisateur non trouvé
 */
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
      res.status(404).json({ message: 'Produit non trouvé' });
    }

    await prisma.user.update({
      where: { id: userIdInt },
      data: {
        wishlist: {
          connect: { id: Number(productId) },
        },
      },
    });

    res.json({ message: 'Produit ajouté à la wishlist avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /users/{userId}/orders:
 *   get:
 *     summary: Récupère les commandes d'un utilisateur
 *     description: Retourne une liste de toutes les commandes passées d'un utilisateur par son ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des commandes de l'utilisateur
 *       404:
 *         description: Aucune commande trouvée pour cet utilisateur
 */
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
