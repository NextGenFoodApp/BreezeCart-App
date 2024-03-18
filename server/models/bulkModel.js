const mongoose = require('mongoose');
const db = require('../db');

const {Schema} = mongoose;

const bulkSchema = new Schema({
    bulk_id:{
        type: Number,
        required: true,
        unique: true 
    },
    items:{
        type: Array,
        default: []
    },
    frequency:{
        type: String,  // How often delivery should take place
        required: true
    },
    delivery_starting_date:{
        type: String,
        required: true 
    },
    status:{
        type: String, // Active nor not currently
        required: true 
    }
},
{
    timestamps: true
});

const orderModel = db.model('orders', orderSchema);

module.exports = orderModel;