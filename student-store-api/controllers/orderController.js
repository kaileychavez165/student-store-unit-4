const orderModel = require("../models/orderModel");
const orderItemModel = require("../models/orderItemModel");

const getAllOrders = async (req, res) => {
  const { customer_id, status, sort } = req.query;
  let filter = {};
  let orderBy = {};

  if (customer_id) {
    filter.customer_id = parseInt(customer_id);
  }

  if (status) {
    filter.status = status;
  }

  if (sort) {
    orderBy = { total_price: sort === "asc" ? "asc" : "desc" };
  }

  try {
    const orders = await orderModel.getAllOrders(filter, orderBy);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderModel.getOrderById(req.params.order_id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const neworder = await orderModel.createOrder(req.body);
    res.status(201).json(neworder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedorder = await orderModel.updateOrder(req.params.order_id, req.body);
    if (updatedorder) {
      res.status(200).json(updatedorder);
    } else {
      res.status(404).json({ error: "order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedorder = await orderModel.deleteOrder(req.params.order_id);
    if (deletedorder) {
      res.status(200).json(deletedorder);
    } else {
      res.status(404).json({ error: "order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addOrderItemsToOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.order_id);
    const order = await orderModel.getOrderById(orderId);
    const { items } = req.body;
  
    const createdOrderItems = [];
    for (const item of items) {
    const createdOrderItem = await orderItemModel.createOrderItem({
      ...item,
      order_id: orderId,
    });
      createdOrderItems.push(createdOrderItem);
    }

    const updatedOrder = await orderModel.calculateAndUpdateOrderTotal(orderId);
  
    res.status(200).json({ order: updatedOrder, createdOrderItems });
  } catch (error) {
   res.status(400).json({ error: error.message });
  }
};
  
const getOrderTotal = async (req, res) => {
  try {
    const orderId = parseInt(req.params.order_id);
    const order = await orderModel.getOrderById(orderId);
    const totalPrice = order.total_price;
    
    res.status(200).json({ total_price: totalPrice });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  addOrderItemsToOrder,
  getOrderTotal
};