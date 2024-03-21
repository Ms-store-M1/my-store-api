const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/createorder", orderController.createOrder);

module.exports = router;
