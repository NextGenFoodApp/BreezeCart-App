const Bulk = require('../models/bulkModel');

// Get all bulks in the database.
exports.getAllBulks = async () => {
    try{
        const bulks = await Bulk.find();
        console.log(bulks);
        return bulks;
    }
    catch(err){
        console.log(err);
    }
}

// Get one bulk
exports.getSpecificBulk = async (id) => {
    try{
        const bulk = await Bulk.findOne({bulk_id: id});
        console.log(bulk);
        return bulk;
    }
    catch(err){
        console.log(err);
    }
}

// Add new bulk
exports.addNewBulk = async (bulk) => {
    try{
        const newbulk = new Bulk(bulk);
        const addedbulk = await newbulk.save();
        console.log(addedbulk);
    }
    catch(err){
        console.log(err);
    }
}

// Add an item to a bulk  
exports.addToBulk = async (id, item) => {
    try{
        const bulk = await Bulk.findOne({bulk_id : id});
        let bulkItems = bulk.items;
        let updated = false;
        bulkItems.map((i,index) => {
            if(i.product_id === item.product_id && i.item_id === item.item_id){
                bulkItems[index].quantity += item.quantity;
                updated = true;
            }
        });
        if(!updated) bulkItems.push(item); 
        await Bulk.updateOne(
            {bulk_id : id},
            {$set: {items: bulkItems}}
        );
    }
    catch(err){
        console.log(err);
    }
}

// Delete an item from a bulk 
exports.deleteItemFromBulk = async (id, index) => {
    try{
        const bulk = await Bulk.findOne({bulk_id : id});
        let bulkItems = bulk.items;
        const newBulk = bulkItems.filter((_,i) => i !== index);
        console.log(index);
        console.log(newBulk);
        await Bulk.updateOne(
            {bulk_id : id},
            {$set: {items: newBulk}}
        );
    }
    catch(err){
        console.log(err);
    }
}

// Update quantity of a bulk item 
exports.updateBulkItemQuantity = async (id, index, newQuantity) => {
    try{
        const bulk = await Bulk.findOne({bulk_id : id});
        let bulkItems = bulk.items;
        bulkItems[index].quantity = newQuantity;
        await Bulk.updateOne(
            {bulk_id : id},
            {$set: {items: bulkItems}}
        );
    }
    catch(err){
        console.log(err);
    }
}

