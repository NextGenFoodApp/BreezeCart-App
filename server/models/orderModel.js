const mongoose = require('mongoose');
const db = require('../db');

const {Schema} = mongoose;

const orderSchema = new Schema({
    order_id:{
        type: Number,
        required: true,
        unique: true 
    },
    user_id:{
        type: Number,
        required: true
    },
    status:{
        type: String,    // Placed, Processing, Shipped, Delivered 
        required: true 
    },
    items:{
        type: Array,
        default: []
    },
    total_price:{
        type: Number,
        required: true 
    },
    shipping_address:{
        type: Object,
        required: true 
    }
},
{
    timestamps: true
});

const orderModel = db.model('orders', orderSchema);

module.exports = orderModel;