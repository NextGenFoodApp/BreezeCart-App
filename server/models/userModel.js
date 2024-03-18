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
    password:{
        type: String,
        required: true 
    },
    is_admin:{
        type: Boolean,
        default: false
    },
    current_bulk_id: {
        type: Array,
        required: true
    },
    bulk_history: {
        type: Array,
        default : []
    }
},
{
    timestamps: true
});

const userModel = db.model('users', userSchema);

module.exports = userModel;