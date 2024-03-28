const express = require('express');
const router = express.Router();
const refundController = require('../controllers/refund.controller');


router.post('/request/:orderId', refundController.requestRefund);
router.put('/validate/:orderId', refundController.validateRefund);

module.exports = router;

