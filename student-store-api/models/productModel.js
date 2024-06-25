const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function gets all the products
const getAllProducts = () => {
  return prisma.product.findMany({
    where: filter,
    orderBy: orderBy,
  });
};

//Function to get product by ID
const getProductById = async (id) => {
  return prisma.product.findUnique({ where: { id: parseInt(id) } });
};

//Function to create a new product
const createProduct = async (productData) => {
  return prisma.product.create({ data: productData });
};

//Function to update a product
const updateProduct = async (id, productData) => {
  return prisma.product.update({
    where: { id: parseInt(id) },
    data: productData,
  });
};

//Function to delete a product
const deleteProduct = async (id) => {
  return prisma.product.delete({ where: { id: parseInt(id) } });
};

//export the functions
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};