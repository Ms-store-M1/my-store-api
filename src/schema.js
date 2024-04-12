/* eslint-disable max-len */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de l'utilisateur.
 *         lastname:
 *           type: string
 *           description: Nom de famille de l'utilisateur.
 *         firstname:
 *           type: string
 *           description: Prénom de l'utilisateur.
 *         mail:
 *           type: string
 *           description: Adresse mail de l'utilisateur. Doit être unique.
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur.
 *         address:
 *           type: string
 *           description: Adresse de l'utilisateur.
 *         zipcode:
 *           type: string
 *           description: Code postal de l'adresse de l'utilisateur.
 *         city:
 *           type: string
 *           description: Ville de l'adresse de l'utilisateur.
 *         phone:
 *           type: string
 *           description: Numéro de téléphone de l'utilisateur.
 *         isadmin:
 *           type: boolean
 *           description: Indique si l'utilisateur est un administrateur.
 *       required:
 *         - id
 *         - lastname
 *         - firstname
 *         - mail
 *         - password
 *         - address
 *         - zipcode
 *         - city
 *         - phone
 *         - isadmin
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant unique du produit généré automatiquement.
 *         name:
 *           type: string
 *           description: Le nom du produit.
 *         description:
 *           type: string
 *           description: Une description du produit. Peut être null.
 *         active:
 *           type: boolean
 *           description: Statut actif du produit. Par défaut à false.
 *         thumbnail:
 *           type: string
 *           description: Lien vers la vignette du produit.
 *         packshot:
 *           type: string
 *           description: Lien vers l'image principale du produit. Chemin par défaut à "/uploads/".
 *         price:
 *           type: number
 *           format: float
 *           description: Le prix du produit. Par défaut à 0.00.
 *       required:
 *         - id
 *         - name
 *         - active
 *         - thumbnail
 *         - packshot
 *         - price
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de la commande.
 *         userId:
 *           type: integer
 *           description: Identifiant de l'utilisateur ayant passé la commande.
 *         deliveryAddress:
 *           type: string
 *           description: Adresse de livraison de la commande. Peut être null.
 *         deliveryMode:
 *           type: string
 *           description: Mode de livraison choisi pour la commande ("livraison à domicile" ou "retrait en magasin").
 *         paymentToken:
 *           type: string
 *           description: Token de paiement associé à la commande. Peut être null.
 *         orderNumber:
 *           type: string
 *           description: Numéro unique de la commande.
 *         totalAmount:
 *           type: number
 *           format: float
 *           description: Montant total de la commande.
 *         totalItems:
 *           type: integer
 *           description: Nombre total d'articles dans la commande.
 *         orderDate:
 *           type: string
 *           format: date-time
 *           description: Date et heure de la commande.
 *         status:
 *           type: string
 *           description: Statut de la commande ("payé", "demande de remboursement", "remboursé").
 *       required:
 *         - id
 *         - userId
 *         - deliveryMode
 *         - orderNumber
 *         - totalAmount
 *         - totalItems
 *         - orderDate
 *         - status
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de l'élément du panier.
 *         userId:
 *           type: integer
 *           description: Identifiant de l'utilisateur associé à cet élément du panier.
 *         productId:
 *           type: integer
 *           description: Identifiant du produit ajouté au panier.
 *         quantity:
 *           type: integer
 *           description: Quantité du produit dans le panier.
 *       required:
 *         - id
 *         - userId
 *         - productId
 *         - quantity
 */
