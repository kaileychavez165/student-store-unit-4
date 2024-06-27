const productModel = require("../models/productModel");

const getAllProducts = async (req, res) => {
  const { category, price, sort } = req.query;
  let filter = {};
  let orderBy = {};

  if (category) {
    filter.category = category;
  }

  if (price) {
    filter.price = parseInt(price);
  }

  if (sort) {
    orderBy = { name: sort === "asc" ? "asc" : "desc" };
  }

  try {
    const products = await productModel.getAllProducts(filter, orderBy);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const newproduct = await productModel.createProduct(req.body);
    res.status(201).json(newproduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedproduct = await productModel.updateProduct(req.params.id, req.body);
    if (updatedproduct) {
      res.status(200).json(updatedproduct);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedproduct = await productModel.deleteProduct(req.params.id);
    if (deletedproduct) {
      res.status(200).json(deletedproduct);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};