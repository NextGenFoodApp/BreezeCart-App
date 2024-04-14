const mongoose = require('mongoose');
const db = require('../db');

const {Schema} = mongoose;

const deliveryGuySchema = new Schema({
    delivery_guy_id:{
        type: Number,
        required: true,
        unique: true 
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address: {
        type: String,
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
    nic:{
        type: String,
        required : true 
    },
    image:{
        type: String,
        required: true
    },
    bank_acc_number:{
        type: String,
        required: true 
    },
    bank_acc_holder:{
        type: String,
        required: true 
    },
    bank:{
        type: String,
        required: true 
    },
    bank_branch:{
        type: String,
        required: true 
    },
},
{
    timestamps: true
});

const deliveryGuyModel = db.model('delivery_guys', deliveryGuySchema);

module.exports = deliveryGuyModel;