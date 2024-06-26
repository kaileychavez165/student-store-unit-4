const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");

// get all the orders
router.get("/", orderItemController.getAllOrderItems);
//get order by ID
router.get("/:order_item_id", orderItemController.getOrderItemById);
//add a new order
router.post("/", orderItemController.createOrderItem);
//create a new order
router.put("/:order_item_id", orderItemController.updateOrderItem);
//delete a order
router.delete("/:order_item_id", orderItemController.deleteOrderItem);

module.exports = router;