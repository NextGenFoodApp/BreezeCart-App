const mongoose = require('mongoose');
const db = require('../db');

const {Schema} = mongoose;

const shopSchema = new Schema({
    shop_id:{
        type: Number,
        required: true,
        unique: true 
    },
    shop_name:{
        type: String,
        required: true
    },
    shop_owner:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required : true 
    },
    postal_code: {
        type: Number,
        required : true 
    },
    phone_no: {
        type: String,
        required : true 
    },
    email: {
        type: String,
        required : true 
    },
    products:{
        type: Array,
        default: []
    },
    orders:{
        type: String,
        required: true
    },
    logo:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const shopModel = db.model('shops', shopSchema);

module.exports = shopModel;