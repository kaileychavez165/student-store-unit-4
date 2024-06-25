// import productModel
const productModel = require("../models/productModel");

// Function gets all the products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await productModel.getproductById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to create a new product
const createProduct = async (req, res) => {
  try {
    const newproduct = await productModel.createproduct(req.body);
    res.status(201).json(newproduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to update a product
const udpateProduct = async (req, res) => {
  try {
    const updatedproduct = await productModel.updateproduct(req.params.id, req.body);
    if (updatedproduct) {
      res.status(200).json(updatedproduct);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to delete a product
const deleteProduct = async (req, res) => {
  try {
    const deletedproduct = await productModel.deleteproduct(req.params.id);
    if (deletedproduct) {
      res.status(200).json(deletedproduct);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//export the functions
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  udpateProduct,
  deleteProduct,
};