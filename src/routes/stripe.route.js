const express = require('express');

const router = express.Router();
const stripeController = require('../controllers/stripe.controller');

router.post('/create-checkout-session', stripeController.createCheckoutSession);
router.post('/webhook', stripeController.webhook);
router.get('/confirm', stripeController.confirmOrder);

module.exports = router;
