const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function gets all the orders
const getAllOrderItems = () => {
  return prisma.orderItem.findMany();
};

//Function to get order by ID
const getOrderItemById = async (id) => {
  return prisma.orderItem.findUnique({ where: { order_item_id: parseInt(id) } });
};

//Function to create a new order
const createOrderItem = async (orderItemData) => {
  return prisma.orderItem.create({ data: orderItemData });
};

//Function to update a order
const updateOrderItem = async (id, orderItemData) => {
    return prisma.orderItem.update({
      where: { order_item_id: parseInt(id) },
      data: orderItemData,
    });
  };
  
  //Function to delete a order
  const deleteOrderItem = async (id) => {
    return prisma.orderItem.delete({ where: { order_item_id: parseInt(id) } });
  };

//export the functions
module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
};