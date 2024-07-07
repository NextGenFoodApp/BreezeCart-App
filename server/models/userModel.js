const mongoose = require('mongoose');
const db = require('../db');

const userSchema = mongoose.Schema({
    user_id:{
        type: Number,
        required: true
    },
    name:{
        type: Object,
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
    phone:{
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
    address: {
        type: Object,
        required: true
    },
    current_bulk_id: {
        type: Array,
        default : []
    },
    bulk_history: {
        type: Array,
        default : []
    },
    image:{
        type: String,
        required: true
    },
    cart:{
        type: Array,
        default : []
    }
},
{
    timestamps: true
});

const userModel = db.model('users', userSchema);

module.exports = userModel;