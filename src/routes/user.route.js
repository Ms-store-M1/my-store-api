/* eslint-disable quotes */
const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");

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
router.get("/", userController.getAllUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     description: Retourne un seul utilisateur.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à récupérer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un utilisateur trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur non trouvé.
 */
router.get("/:id", userController.getUserById);
/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     description: Ajoute un nouvel utilisateur à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 */
router.post("/create", userController.createUser);
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
 *         description: ID de l'utilisateur à mettre à jour.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 */
router.put("/update/:id", userController.updateUser);
/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     description: Supprime un utilisateur de la base de données.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 */
router.delete("/delete/:id", userController.deleteUser);
/**
 * @swagger
 * /users/{userId}/wishlist/{productId}:
 *   post:
 *     summary: Ajoute un produit à la liste de souhaits d'un utilisateur
 *     description: Associe un produit à la liste de souhaits d'un utilisateur spécifié.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID du produit à ajouter à la liste de souhaits.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produit ajouté à la liste de souhaits avec succès.
 */
router.post("/:userId/wishlist/:productId", userController.addtoWishlist);
/**
 * @swagger
 * /users/{userId}/orders:
 *   get:
 *     summary: Récupère les commandes d'un utilisateur
 *     description: Retourne une liste de toutes les commandes passées par un utilisateur.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur pour lequel récupérer les commandes.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Une liste des commandes de l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/:userId/orders", userController.getorders);

module.exports = router;
