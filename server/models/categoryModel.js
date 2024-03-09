const mongoose = require('mongoose');
const db = require('../db');

const {Schema} = mongoose;

const categorySchema = new Schema({
    category_id:{
        type: Number,
        required: true,
        unique: true 
    },
    category_name:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const categotyModel = db.model('categories', categorySchema);

module.exports = categotyModel;