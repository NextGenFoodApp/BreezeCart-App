const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb+srv://shop:shop@cluster0.cumlxo2.mongodb.net/shop')
                        .on('open', ()=>{
                            console.log("MongoDB connected successfully.");
                        })
                        .on('error', ()=>{
                            console.log("MongoDB connection failed.");
                        });

module.exports = connection;