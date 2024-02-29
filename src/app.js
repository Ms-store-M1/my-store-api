/* eslint-disable quotes */
const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./middlewares/errorsHandling");
const config = require("./config");
const routes = require("./routes");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// cors
app.use(
  cors({
    origin: config.frontend_url,
  }),
);

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

// Options de configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OpenAPI Ms-store-M1",
      version: "1.0.0",
      description:
                "Cette API permet la gestion d'utilisateurs et de produits. Les utilisateurs peuvent s'inscrire, se connecter, et gérer leur profil. Ils peuvent également parcourir une liste de produits, ajouter des produits à leur wishlist et consulter leurs commandes. Une route spéciale 'isAuth' est utilisée pour vérifier l'authentification des utilisateurs avant de leur permettre d'accéder à certaines fonctionnalités. Les produits peuvent être ajoutés, mis à jour, ou supprimés uniquement par les administrateurs.",
    },
  },
  apis: [".routes/*.js"], // Cela inclura tous les fichiers .js dans le dossier routes et ses sous-dossiers
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
