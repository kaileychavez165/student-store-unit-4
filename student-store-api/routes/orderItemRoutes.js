const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");

router.get("/", orderItemController.getAllOrderItems);
router.get("/:order_item_id", orderItemController.getOrderItemById);

router.post("/", orderItemController.createOrderItem);
router.put("/:order_item_id", orderItemController.updateOrderItem);
router.delete("/:order_item_id", orderItemController.deleteOrderItem);

module.exports = router;