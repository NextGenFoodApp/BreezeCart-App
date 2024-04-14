const mongoose = require('mongoose');
const db = require('../db');

const userSchema = mongoose.Schema({
    user_id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone_no:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true 
    },
    is_admin:{
        type: Boolean,
        default: false
    },
    current_bulks_id: {
        type: Array,
        required: true
    },
    bulk_history: {
        type: Array,
        default : []
    },
    image:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const userModel = db.model('users', userSchema);

module.exports = userModel;