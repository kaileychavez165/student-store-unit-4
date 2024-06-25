const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function gets all the orders
const getAllOrders = (filter = {}, orderBy = {}) => {
  return prisma.order.findMany({
    where: filter,
    orderBy: orderBy,
  });
};

//Function to get order by ID
const getOrderById = async (id) => {
  return prisma.order.findUnique({ where: { order_id: parseInt(id) } });
};

//Function to create a new order
const createOrder = async (orderData) => {
  return prisma.order.create({ data: orderData });
};

//Function to update a order
const updateOrder = async (id, orderData) => {
  return prisma.order.update({
    where: { order_id: parseInt(id) },
    data: orderData,
  });
};

//Function to delete a order
const deleteOrder = async (id) => {
  return prisma.order.delete({ where: { order_id: parseInt(id) } });
};

//export the functions
module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};