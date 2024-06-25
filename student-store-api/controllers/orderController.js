// import orderModel
const orderModel = require("../models/orderModel");

// Function gets all the orders
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

//Function to get order by ID
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

//Function to create a new order
const createOrder = async (req, res) => {
  try {
    const neworder = await orderModel.createOrder(req.body);
    res.status(201).json(neworder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to update a order
const updateOrder= async (req, res) => {
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

//Function to delete a order
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

//export the functions
module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};