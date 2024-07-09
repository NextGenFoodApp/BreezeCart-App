const mongoose = require('mongoose');
const db = require('../db');

const {Schema} = mongoose;

const bulkOrderSchema = new Schema({
    bulk_order_id:{
        type: Number,
        required: true,
        unique: true 
    },
    user_id:{
        type: Number,
        required: true
    },
    bulk_id:{
        type: Number,
        required: true
    },
    paid_times:{
        type: Number,
        required: true 
    },
    items:{
        type: Array,
        default: []
    },
    bulk_value:{
        type: Number,
        required: true
    },
    paid_amount:{
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

const bulkOrderModel = db.model('bulk-orders', bulkOrderSchema);

module.exports = bulkOrderModel;