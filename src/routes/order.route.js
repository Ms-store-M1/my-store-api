const express = require("express");

const router = express.Router();
const orderController = require("../controllers/order.controller");

/**
 * @swagger
 * /orders/createorder:
 *   post:
 *     summary: Crée une nouvelle commande
 *     description: Ajoute une nouvelle commande à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Commande créée avec succès.
 */
router.post("/createorder", orderController.createOrder);

/**
 * @swagger
 * /orders/confirmation/{orderId}:
 *   get:
 *     summary: Confirme une commande
 *     description: Retourne une confirmation pour une commande spécifique.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID de la commande à confirmer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Confirmation de la commande réussie.
 *       404:
 *         description: Commande non trouvée.
 */
router.get("/confirmation/:orderId", orderController.orderConfirmation);

/**
 * @swagger
 * /orders/getorder/{orderId}:
 *   get:
 *     summary: Récupère une commande par son ID
 *     description: Retourne une commande spécifique par son ID.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID de la commande à récupérer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Une commande trouvée.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Commande non trouvée.
 */
router.get("/getorder/:orderId", orderController.getOrderById);

/**
 * @swagger
 * /orders/getorders:
 *   get:
 *     summary: Récupère toutes les commandes
 *     description: Retourne une liste de toutes les commandes.
 *     responses:
 *       200:
 *         description: Une liste de toutes les commandes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/getorders", orderController.getOrders);

module.exports = router;
