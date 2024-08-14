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
        password : req.body.password,
        shop_owner : req.body.shop_owner,
        address : req.body.address,
        postal_code : req.body.postal_code,
        phone_no : req.body.phone_no,
        email : req.body.email,
        products : [],
        orders : [],
        logo : req.body.logo,
        bank_acc_number: req.body.bank_acc_number,
        bank_acc_holder: req.body.bank_acc_holder,
        bank: req.body.bank,
        bank_branch: req.body.bank_branch
    }
    await ShopController.addNewShop(new_shop);
})

router.post('/login', async(req,res)=>{
    const {shop_id,password} = req.body;
    const shop = await ShopController.loginShop(shop_id, password);
    res.send(shop);
})

router.post('/update', async (req,res) => {
    await ShopController.updateShop(req.body.shop_id, req.body.shop_name, req.body.shop_owner, req.body.address, req.body.postal_code, req.body.email, req.body.phone);
})

module.exports = router;