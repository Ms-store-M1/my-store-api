const express = require('express');
const productRoute = require('./product.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const cartRoute = require('./cart.route');
const stripeRoute = require('./stripe.route');
const orderRoute = require ('./order.route');

const router = express.Router();

router.use('/products', productRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/cart', cartRoute);
router.use('/stripe', stripeRoute);
router.use('/order',orderRoute);


module.exports = router;
