// import orderModel
const orderModel = require("../models/orderModel");
const orderItemModel = require("../models/orderItemModel");

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

// Function to add items to an order
const addOrderItemsToOrder = async (req, res) => {
    try {
      const orderId = parseInt(req.params.order_id);
      const { items } = req.body;
      console.log(req.body);
      console.log(orderId);
  
      const order = await orderModel.getOrderById(orderId);
      console.log(order);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Create order items and associate with the order
      /* const createdItems = await Promise.all(
        items.map(async (item) => {
          const createdItem = await orderItemModel.createOrderItem({
            ...item,
            order_id: orderId,
          });
          return createdItem;
        })
      );*/

      const createdOrderItems = [];
    for (const item of items) {
    const createdOrderItem = await orderItemModel.createOrderItem({
        ...item,
        order_id: orderId,
    });
    createdOrderItems.push(createdOrderItem);
    }

      // works without promise.all but i want array of newly created items to return

      // Calculate new total price of the order
      const updatedOrder = await orderModel.calculateAndUpdateOrderTotal(orderId);
  
      res.status(200).json({ order: updatedOrder, createdOrderItems });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Function to calculate total price of an order
  const getOrderTotal = async (req, res) => {
    try {
      const orderId = parseInt(req.params.order_id);
      const order = await orderModel.getOrderById(orderId);
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Calculate total price based on order items
      let totalPrice = 0;
        for (const item of order.orderItems) {
            totalPrice += item.price * item.quantity;
        }

      const updatedOrderId = await orderModel.calculateAndUpdateOrderTotal(orderId);
  
      res.status(200).json({ order_id: updatedOrderId, total_price: totalPrice });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// function to add order item to existing order
/* const addOrderItemToOrder = async (req, res) => {
    // add req.body consisting of stuff we want from each order item
    try {
      const addeditem = await orderModel.addOrderItemToOrder(req.params.order_id, req.body);
      if (addeditem) {
        res.status(200).json(addeditem);
      } else {
        res.status(404).json({ error: "order not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }; */

//Function to get total of an order
/* const getOrderTotal = async (req, res) => {
    try {
      const total = await orderModel.getOrderTotal(req.params.order_id);
      if (total) {
        res.status(200).json(total);
      } else {
        res.status(404).json({ error: "order not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }; */

//export the functions
module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  addOrderItemsToOrder,
  getOrderTotal
  // addOrderItemToOrder,
  // getOrderTotal
};