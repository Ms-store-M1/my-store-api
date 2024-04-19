const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  if (!res.headersSent) {
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
  return res.status(statusCode).send({
    success: false,
    status: statusCode,
    stack: process.env.NODE_ENV,
    message: err.message || 'Something went wrong',
  });
};

// Utiliser le middleware de gestion des erreurs
module.exports = errorHandler;
