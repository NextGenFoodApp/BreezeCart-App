const DeliveryGuy = require('../models/deliveryGuyModel');

exports.getAllDeliveryGuys = async () => {
    try{
        const delivery_guys = await DeliveryGuy.find();
        console.log(delivery_guys);
        return delivery_guys;
    }
    catch(err){
        console.log(err);
    }
}

exports.getSpecificDeliveryGuy = async (id) => {
    try{
        const delivery_guy = await DeliveryGuy.findOne({delivery_guy_id: id});
        console.log(delivery_guy);
        return delivery_guy;
    }
    catch(err){
        console.log(err);
    }
}

exports.addNewDeliveryGuy = async (deliveryGuy) => {
    try{
        const newDeliveryGuy = new DeliveryGuy(deliveryGuy);
        const addedDeliveryGuy = await newDeliveryGuy.save();
        console.log(addedDeliveryGuy);
    }
    catch(err){
        console.log(err);
    }
}

exports.loginDeliveryGuy = async (delivery_guy_id, password) => {
    try{
        const delivery_guy = await DeliveryGuy.findOne({delivery_guy_id:delivery_guy_id, password:password});
        console.log(delivery_guy);
        return delivery_guy;
    }
    catch(err){
        console.log(err);
    }
}