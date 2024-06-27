const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function gets all the orders
const getAllOrders = (filter = {}, orderBy = {}) => {
  return prisma.order.findMany({
    where: filter,
    orderBy: orderBy,
    include: { orderItems: true },
  });
};

//Function to get order by ID
const getOrderById = async (id) => {
  return prisma.order.findUnique({ 
    where: { order_id: parseInt(id) } ,
    include: { orderItems: true },
  });
};

//Function to create a new order
const createOrder = async (orderData) => {
  return prisma.order.create({ data: orderData });
};

/* const createOrder = async (orderData) => {
    const { customer_id, total_price, status, created_at, order_items } = orderData;
  
    try {
      const newOrder = await prisma.order.create({
        data: {
          customer_id,
          total_price,
          status,
          created_at,
          orderItem: {
            createMany: {
              data: orderItem.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
              })),
            },
          },
        },
        include: {
          orderItem: true, // Ensure you include related order items in the response if needed
        },
      });
  
      return newOrder;
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  }; */

//Function to update a order
const updateOrder = async (id, orderData) => {
  return prisma.order.update({
    where: { order_id: parseInt(id) },
    data: orderData,
  });
};

//Function to delete a order
/* const deleteOrder = async (id) => {
  return prisma.order.delete({ where: { order_id: parseInt(id) } });
}; */

const deleteOrder = async (id) => {
  const orderId = parseInt(id);

  try {
    // Fetch order items associated with the order
    const orderItems = await prisma.orderItem.findMany({
      where: {
        order_id: orderId,
      },
    });

    // Delete each order item
    await Promise.all(
      orderItems.map(async (item) => {
        await prisma.orderItem.delete({
          where: {
            order_item_id: item.order_item_id,
          },
        });
      })
    );

    // Now delete the order itself
    const deletedOrder = await prisma.order.delete({
      where: {
        order_id: orderId,
      },
    });

    return deletedOrder;
  } catch (error) {
    throw new Error(`Error deleting order: ${error.message}`);
  }
};

//Function to update a order
/* const addOrderItemToOrder = async (id, orderData) => {
  return prisma.order.update({
    where: { order_id: parseInt(id) },
    data: orderData,
    // call create order item here?
  });
};

//Function to get order by ID
const getOrderTotal = async (id) => {
  return prisma.order.findUnique({ 
    where: { order_id: parseInt(id) } ,
    include: { orderItems: true },
  });
}; */

// Function to calculate and update order total
const calculateAndUpdateOrderTotal = async (orderId) => {
  const order = await prisma.order.findUnique({
    where: { order_id: orderId },
    include: { orderItems: true },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  let totalPrice = 0;
  for (const item of order.orderItems) {
    totalPrice += item.price * item.quantity;
  }

  return prisma.order.update({
    where: { order_id: orderId },
    data: { total_price: totalPrice },
  });
};

//export the functions
module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  calculateAndUpdateOrderTotal
  // addOrderItemToOrder,
  // getOrderTotal
};