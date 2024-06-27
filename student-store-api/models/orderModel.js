const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getAllOrders = (filter = {}, orderBy = {}) => {
  return prisma.order.findMany({
    where: filter,
    orderBy: orderBy,
    include: { orderItems: true },
  });
};

const getOrderById = async (id) => {
  return prisma.order.findUnique({ 
    where: { order_id: parseInt(id) } ,
    include: { orderItems: true },
  });
};

const createOrder = async (orderData) => {
  return prisma.order.create({ data: orderData });
};

const updateOrder = async (id, orderData) => {
  return prisma.order.update({
    where: { order_id: parseInt(id) },
    data: orderData,
  });
};

const deleteOrder = async (id) => {
  return prisma.order.delete({ where: { order_id: parseInt(id) } });
};

const calculateAndUpdateOrderTotal = async (orderId) => {
  const order = await prisma.order.findUnique({
    where: { order_id: orderId },
    include: { orderItems: true },
  });

  let totalPrice = 0;
  for (const item of order.orderItems) {
    totalPrice += item.price * item.quantity;
  }

  let roundedTotalPrice = Math.round((totalPrice * 1.0875) * 100) / 100;

  return prisma.order.update({
    where: { order_id: orderId },
    data: { total_price: roundedTotalPrice },
  });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  calculateAndUpdateOrderTotal
};