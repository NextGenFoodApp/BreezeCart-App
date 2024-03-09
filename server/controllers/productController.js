const Product = require('../models/productModel');

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