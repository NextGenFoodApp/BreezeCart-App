const mongoose = require('mongoose');
const db = require('../db');

const {Schema} = mongoose;

const orderSchema = new Schema({
    order_id:{
        type: Number,
        required: true,
        unique: true 
    },
    shop_id:{
        type: Number,
        required: true
    },
    user_id:{
        type: Number,
        required: true
    },
    type:{
        type: String,  // One-time or Subscription
        required: true
    },
    status:{
        type: String,
        required: true 
    },
    items:{
        type: Array,
        default: []
    }
},
{
    timestamps: true
});

const orderModel = db.model('orders', orderSchema);

module.exports = orderModel;