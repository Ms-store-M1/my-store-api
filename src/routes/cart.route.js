const express = require('express');

const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/:userId', cartController.getCart);
router.post('/add', cartController.addToCart);  
router.put('/update', cartController.updateCartItemQuantity); 
router.delete('/delete/:userId/:productId', cartController.removeProductFromCart);


module.exports = router;