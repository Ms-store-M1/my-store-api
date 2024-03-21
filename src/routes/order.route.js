const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/createorder", orderController.createOrder);
router.get("/confirmation/:orderId", orderController.orderConfirmation);
module.exports = router;
