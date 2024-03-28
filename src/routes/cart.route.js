const express = require('express');

const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/:userId', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/update', cartController.updateCartItemQuantity);
router.delete('/delete/:userId/:productId', cartController.removeProductFromCart);
router.delete('/clear/:userId', cartController.clearCart);

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Récupère le panier d'un utilisateur
 *     description: Retourne le panier de l'utilisateur spécifié par son ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur dont on souhaite récupérer le panier.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Panier récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Panier non trouvé.
 */
router.get('/:userId', cartController.getCart);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Ajoute un produit au panier
 *     description: Ajoute un produit spécifié au panier de l'utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produit ajouté au panier avec succès.
 */
router.post('/add', cartController.addToCart);

/**
 * @swagger
 * /cart/update:
 *   put:
 *     summary: Met à jour la quantité d'un article dans le panier
 *     description: Met à jour la quantité pour un article spécifié dans le panier de l'utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Quantité de l'article mise à jour avec succès.
 */
router.put('/update', cartController.updateCartItemQuantity);

/**
 * @swagger
 * /cart/delete/{userId}/{productId}:
 *   delete:
 *     summary: Supprime un produit du panier
 *     description: Supprime un produit spécifié du panier de l'utilisateur.
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
 *         description: Produit supprimé du panier avec succès.
 */
router.delete('/delete/:userId/:productId', cartController.removeProductFromCart);

/**
 * @swagger
 * /cart/clear/{userId}:
 *   delete:
 *     summary: Vide le panier d'un utilisateur
 *     description: Supprime tous les produits du panier de l'utilisateur spécifié.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Panier vidé avec succès.
 */
router.delete('/clear/:userId', cartController.clearCart);

module.exports = router;
