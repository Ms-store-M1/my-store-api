/* eslint-disable quotes */
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require('swagger-jsdoc');
const errorHandler = require("./middlewares/errorsHandling");
const config = require("./config");
const routes = require("./routes");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors({
  origin: 'http://localhost:3000',
}));

// access to public folder
app.use(express.static(`${__dirname}/public`));

// initial route
app.get("/", (req, res) => {
  res.send({ message: "Welcome to app-store-api application." });
});

// api routes prefix
app.use("/api", routes);

// error handling
app.use(errorHandler);

// run server
app.listen(config.port, () => {
  console.log("server launch");
});

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API',
    version: '1.0.0',
    description: "Cette API permet la gestion d'utilisateurs et de produits. Les utilisateurs peuvent s'inscrire, se connecter, et gérer leur profil. Ils peuvent également parcourir une liste de produits, ajouter des produits à leur wishlist et consulter leurs commandes. Une route spéciale 'isAuth' est utilisée pour vérifier l'authentification des utilisateurs avant de leur permettre d'accéder à certaines fonctionnalités. Les produits peuvent être ajoutés, mis à jour, ou supprimés uniquement par les administrateurs."
    ,
  },
};

const options = {
  swaggerDefinition,
  // './routes/**/*.js' pour inclure tous les fichiers .js dans le dossier routes et sous-dossiers
  apis: ['./src/routes/*.js', './src/schema.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Route pour servir la spécification OpenAPI au format JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
