// import orderModel
const orderItemModel = require("../models/orderItemModel");

// Function gets all the orders
const getAllOrderItems = async (req, res) => {
  try {
    const orderitems = await orderItemModel.getAllOrderItems();
    res.status(200).json(orderitems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to get order by ID
const getOrderItemById = async (req, res) => {
  try {
    const orderitem = await orderItemModel.getOrderItemById(req.params.order_item_id);
    if (orderitem) {
      res.status(200).json(orderitem);
    } else {
      res.status(404).json({ error: "order item not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to create a new order
const createOrderItem = async (req, res) => {
  try {
    const neworderitem = await orderItemModel.createOrderItem(req.body);
    res.status(201).json(neworderitem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to update a order
const updateOrderItem = async (req, res) => {
    try {
      const updatedorderitem = await orderItemModel.updateOrderItem(req.params.order_item_id, req.body);
      if (updatedorderitem) {
        res.status(200).json(updatedorderitem);
      } else {
        res.status(404).json({ error: "order item not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  //Function to delete a order
  const deleteOrderItem = async (req, res) => {
    try {
      const deletedorderitem = await orderItemModel.deleteOrderItem(req.params.order_item_id);
      if (deletedorderitem) {
        res.status(200).json(deletedorderitem);
      } else {
        res.status(404).json({ error: "order item not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

//export the functions
module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
};