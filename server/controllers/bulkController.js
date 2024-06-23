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