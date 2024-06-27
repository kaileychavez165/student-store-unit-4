const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Reading operations
router.get("/", orderController.getAllOrders);
router.get("/:order_id", orderController.getOrderById);

// Creating, updating, and deleting operations
router.post("/", orderController.createOrder);
router.put("/:order_id", orderController.updateOrder);
router.delete("/:order_id", orderController.deleteOrder);

// Custom endpoints
router.post("/:order_id/items", orderController.addOrderItemsToOrder);
router.get("/:order_id/total", orderController.getOrderTotal);

module.exports = router;