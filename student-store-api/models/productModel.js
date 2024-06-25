const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function gets all the products
const getAllProducts = async () => {
  return prisma.products.findMany();
};

//Function to get product by ID
const getProductById = async (id) => {
  return prisma.products.findUnique({ where: { id: parseInt(id) } });
};

//Function to create a new product
const createProduct = async (productData) => {
  return prisma.products.create({ data: productData });
};

//Function to update a product
const updateProduct = async (id, productData) => {
  return prisma.products.update({
    where: { id: parseInt(id) },
    data: productData,
  });
};

//Function to delete a product
const deleteProduct = async (id) => {
  return prisma.products.delete({ where: { id: parseInt(id) } });
};

//export the functions
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};