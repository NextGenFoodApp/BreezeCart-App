const mongoose = require('mongoose');
const db = require('../db');

const {Schema} = mongoose;

const productSchema = new Schema({
    product_id:{
        type: Number,
        required: true,
        unique: true 
    },
    product_name:{
        type: String,
        required: true
    },
    category_id:{
        type: Number,
        required: true
    },
    shop_id:{
        type: Number,
        required: true 
    },
    attribute:{
        type: String,
        required: true 
    },
    items:{
        type: Array,
        default: []
    },
    image:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const productModel = db.model('products', productSchema);

module.exports = productModel;