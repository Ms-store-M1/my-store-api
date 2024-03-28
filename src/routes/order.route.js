const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/createorder/:userId", orderController.createOrder);
//router.get("/confirmation/:orderId", orderController.orderConfirmation);
//router.get("/getorder/:orderId", orderController.getOrderById);
//router.get("/getorders",orderController.getOrders);
module.exports = router;
