/* eslint-disable quotes */
/* eslint-disable max-len */
const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentifie un utilisateur
 *     description: Permet à un utilisateur de se connecter en utilisant son adresse email et son mot de passe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: L'adresse email de l'utilisateur.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Le mot de passe de l'utilisateur.
 *     responses:
 *       200:
 *         description: Connexion réussie. Retourne un token d'authentification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Le token JWT utilisé pour authentifier les requêtes suivantes de l'utilisateur.
 *       401:
 *         description: Authentification échouée. Email ou mot de passe incorrect.
 */
router.post("/login", authController.login);

module.exports = router;
