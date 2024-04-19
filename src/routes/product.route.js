/* eslint-disable indent */
/* eslint-disable quotes */
const express = require("express");

const router = express.Router();
const productController = require("../controllers/product.controller");

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Récupère tous les produits
 *     description: Retourne une liste de tous les produits.
 *     responses:
 *       200:
 *         description: Une liste de tous les produits.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/admin", productController.getAllProducts);
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Récupère un produit par son ID
 *     description: Retourne un seul produit.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à récupérer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un produit trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé.
 */
router.get("/:id", productController.getProduct);
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupère tous les produits
 *     description: Retourne une liste de tous les produits.
 *     responses:
 *       200:
 *         description: Une liste de tous les produits.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", productController.getProducts);
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Met à jour un produit
 *     description: Met à jour les informations d'un produit existant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à mettre à jour.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès.
 *       404:
 *         description: Produit non trouvé.
 */
router.put("/:id", productController.updateProduct);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Supprime un produit
 *     description: Supprime un produit de la base de données.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à supprimer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès.
 *       404:
 *         description: Produit non trouvé.
 */
router.delete("/:id", productController.deleteProduct);

module.exports = router;
