const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// get all the products
router.get("/", productController.getAllproducts);
//get product by ID
router.get("/:id", productController.getproductById);
//add a new product
router.post("/", productController.createproduct);
//create a new product
router.put("/:id", productController.udpateproduct);
//delete a product
router.delete("/:id", productController.deleteproduct);

module.exports = router;