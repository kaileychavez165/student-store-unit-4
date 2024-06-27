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
    try {
        const createdItem = await prisma.orderItem.create({
          data: orderItemData,
        });
        return createdItem;
      } catch (error) {
        // Log the error for debugging purposes
        console.error(`Error creating order item: ${error.message}`);
        // Throw a more specific error or handle as needed
        throw new Error(`Failed to create order item: ${error.message}`);
      }
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