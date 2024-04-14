const express = require('express');
const router = express.Router();

const DeliveryGuyController = require('../controllers/deliveryGuyController');

router.get('/', async (req,res)=>{
    const delivery_guys = await DeliveryGuyController.getAllDeliveryGuys();
    res.send(delivery_guys);
})

router.get('/:id', async (req,res)=>{
    const delivery_guy = await DeliveryGuyController.getSpecificDeliveryGuy(req.params.id);
    res.send(delivery_guy);
})

router.post('/', async (req,res)=>{
    const delivery_guys = await DeliveryGuyController.getAllDeliveryGuys();
    const new_delivery_guy_id = delivery_guys.length + 1;
    const new_delivery_guy = {
        delivery_guy_id : new_delivery_guy_id,
        name : req.body.name,
        password : req.body.password,
        address : req.body.address,
        nic : req.body.nic,
        phone_no : req.body.phone_no,
        email : req.body.email,
        image : req.body.image,
        bank_acc_number: req.body.bank_acc_number,
        bank_acc_holder: req.body.bank_acc_holder,
        bank: req.body.bank,
        bank_branch: req.body.bank_branch
    }
    await ShopController.addNewShop(new_shop);
})

router.post('/login', async(req,res)=>{
    const {shop_id,password} = req.body;
    await UserController.loginShop(shop_id, password);
})

module.exports = router;