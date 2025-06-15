const Product = require("../models/productModel");

// Get all products in the database.
exports.getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    console.log(err);
  }
};

// Get one product
exports.getSpecificProduct = async (id) => {
  try {
    const product = await Product.findOne({ product_id: id });
    console.log(product);
    return product;
  } catch (err) {
    console.log(err);
  }
};

// Get all products in one shop
exports.getShopProducts = async (shop_id) => {
  try {
    const products = await Product.find({ shop_id: shop_id });

    return products;
  } catch (err) {
    console.log(err);
  }
};

// Get all products in one category
exports.getCategoryProducts = async (category_id) => {
  try {
    const products = await Product.find({ category_id: category_id });

    return products;
  } catch (err) {
    console.log(err);
  }
};

// Add new product
exports.addNewProduct = async (product) => {
  try {
    const newProduct = new Product(product);
    const addedProduct = await newProduct.save();
    console.log(addedProduct);
    console.log("Add Product Successfully ---------");
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProductById = async (product_id) => {
  try {
    const result = await Product.deleteOne({ product_id }); // assuming product_id is a field in your schema
    return result.deletedCount > 0; // returns true if a product was deleted
  } catch (err) {
    console.error("Error in deleteProductById:", err);
    throw err;
  }
};

// Update product by product_id
exports.updateProductById = async (product_id, updatedData) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { product_id: product_id },
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      console.log("Product not found.");
      return null;
    }

    console.log("Product updated successfully:", updatedProduct);
    return updatedProduct;
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
};
