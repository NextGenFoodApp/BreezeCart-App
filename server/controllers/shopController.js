const Shop = require("../models/shopModel");

exports.getAllShops = async () => {
  try {
    const shops = await Shop.find();
    return shops;
  } catch (err) {
    console.log(err);
  }
};

exports.getSpecificShop = async (id) => {
  try {
    const shop = await Shop.findOne({ shop_id: id });
    console.log(shop);
    return shop;
  } catch (err) {
    console.log(err);
  }
};

exports.addNewShop = async (shop) => {
  try {
    const newShop = new Shop(shop);
    const addedShop = await newShop.save();
    console.log(addedShop);
  } catch (err) {
    console.log(err);
  }
};

exports.loginShop = async (shop_id, password) => {
  try {
    const shop = await Shop.findOne({ shop_id: shop_id, password: password });
    console.log(shop);
    return shop;
  } catch (err) {
    console.log(err);
  }
};

exports.updateShop = async (
  id,
  name,
  owner,
  address,
  postal_code,
  email,
  phone
) => {
  await Shop.updateOne(
    { shop_id: id },
    {
      $set: {
        shop_name: name,
        shop_owner: owner,
        address: address,
        postal_code: postal_code,
        email: email,
        phone: phone,
      },
    }
  );
};

exports.getShopCount = async () => {
  try {
    const count = await Shop.countDocuments();
    console.log("Shop Count:", count);
    return count;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Delete a shop by shop_id
exports.deleteShop = async (id) => {
  try {
    const deletedShop = await Shop.findOneAndDelete({ shop_id: id });
    if (!deletedShop) {
      console.log("Shop not found for deletion");
      return null;
    }
    console.log("Deleted Shop:", deletedShop);
    return deletedShop;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
