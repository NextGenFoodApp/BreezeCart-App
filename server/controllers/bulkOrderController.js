const BulkOrder = require('../models/bulkOrderModel');

exports.getAllBulkOrders = async () => {
    try{
        const bulkOrders = await BulkOrder.find();
        console.log(bulkOrders);
        return bulkOrders;
    }
    catch(err){
        console.log(err);
    }
}

exports.getSpecificBulkOrder = async (id) => {
    try{
        const bulkOrder = await BulkOrder.findOne({order_id: id});
        console.log(bulkOrder);
        return bulkOrder;
    }
    catch(err){
        console.log(err);
    }
}

exports.addNewBulkOrder = async (order) => {
    try{
        const newOrder = new BulkOrder(order);
        const addedOrder = await newOrder.save();
        console.log(addedOrder);
    }
    catch(err){
        console.log(err);
    }
}