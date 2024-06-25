const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// get all the orders
router.get("/", orderController.getAllOrders);
//get order by ID
router.get("/:order_id", orderController.getOrderById);
//add a new order
router.post("/", orderController.createOrder);
//create a new order
router.put("/:order_id", orderController.updateOrder);
//delete a order
router.delete("/:order_id", orderController.deleteOrder);

module.exports = router;