const Shop = require('../models/shopModel');

exports.getAllShops = async () => {
    try{
        const shops = await Shop.find();
        console.log(shops);
        return shops;
    }
    catch(err){
        console.log(err);
    }
}

exports.getSpecificShop = async (id) => {
    try{
        const shop = await Shop.findOne({shop_id: id});
        console.log(shop);
        return shop;
    }
    catch(err){
        console.log(err);
    }
}

exports.addNewShop = async (shop) => {
    try{
        const newShop = new Shop(shop);
        const addedShop = await newShop.save();
        console.log(addedShop);
    }
    catch(err){
        console.log(err);
    }
}

exports.loginShop = async (shop_id, password) => {
    try{
        const shop = await Shop.findOne({shop_id:shop_id, password:password});
        console.log(shop);
        return shop;
    }
    catch(err){
        console.log(err);
    }
}

exports.updateShop = async (id, name, owner, address, postal_code, email, phone) => {
    await Shop.updateOne(
        {shop_id : id},
        {$set: {
            shop_name: name,
            shop_owner: owner,
            address: address,
            postal_code: postal_code,
            email: email,
            phone: phone
        }}
    );
}