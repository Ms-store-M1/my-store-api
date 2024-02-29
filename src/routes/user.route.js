/* eslint-disable quotes */
const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/create", userController.createUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/:userId/wishlist/:productId", userController.addtoWishlist);
router.get("/:userId/orders", userController.getorders);

module.exports = router;
