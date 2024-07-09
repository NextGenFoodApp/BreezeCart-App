const Order = require('../models/orderModel');

exports.getAllOrders = async () => {
    try{
        const orders = await Order.find();
        console.log(orders);
        return orders;
    }
    catch(err){
        console.log(err);
    }
}

exports.getSpecificOrder = async (id) => {
    try{
        const order = await Order.findOne({order_id: id});
        console.log(order);
        return order;
    }
    catch(err){
        console.log(err);
    }
}

exports.addNewOrder = async (order) => {
    try{
        const newOrder = new Order(order);
        const addedOrder = await newOrder.save();
        console.log(addedOrder);
    }
    catch(err){
        console.log(err);
    }
}