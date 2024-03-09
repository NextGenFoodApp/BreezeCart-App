const express = require('express');
const router = express.Router();

const ShopController = require('../controllers/shopController');

router.get('/', async (req,res)=>{
    const shops = await ShopController.getAllShops();
    res.send(shops);
})

router.get('/:id', async (req,res)=>{
    const shop = await ShopController.getSpecificShop(req.params.id);
    res.send(shop);
})

router.post('/', async (req,res)=>{
    const shops = await ShopController.getAllShops();
    const new_shop_id = shops.length + 1;
    const new_shop = {
        shop_id : new_shop_id,
        shop_name : req.body.shop_name,
        shop_owner : req.body.shop_owner,
        address : req.body.address,
        postal_code : req.body.postal_code,
        phone_no : req.body.phone_no,
        email : req.body.email,
        products : [],
        orders : []
    }
    await ShopController.addNewShop(new_category);
})

module.exports = router;