const Product = require('../models/productModel');

// Get all products in the database.
exports.getAllProducts = async () => {
    try{
        const products = await Product.find();
        console.log(products);
        return products;
    }
    catch(err){
        console.log(err);
    }
}

// Get one product
exports.getSpecificProduct = async (id) => {
    try{
        const product = await Product.findOne({product_id: id});
        console.log(product);
        return product;
    }
    catch(err){
        console.log(err);
    }
}

// Get all products in one shop
exports.getShopProducts = async (shop_id) => {
    try{
        const products = await Product.find({shop_id: shop_id});
        console.log(products);
        return products;
    }
    catch(err){
        console.log(err);
    }
}

// Get all products in one category
exports.getCategoryProducts = async (category_id) => {
    try{
        const products = await Product.find({category_id: category_id});
        console.log(products);
        return products;
    }
    catch(err){
        console.log(err);
    }
}

// Add new product
exports.addNewProduct = async (product) => {
    try{
        const newProduct = new Product(product);
        const addedProduct = await newProduct.save();
        console.log(addedProduct);
    }
    catch(err){
        console.log(err);
    }
}

