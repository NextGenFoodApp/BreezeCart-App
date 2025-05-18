const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb+srv://breezecart:breezecart@cluster0.piz6suw.mongodb.net/shop')
                        .on('open', ()=>{
                            console.log("MongoDB connected successfully.");
                        })
                        .on('error', ()=>{
                            console.log("MongoDB connection failed.");
                        });

module.exports = connection;