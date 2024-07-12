const express = require('express');
const router = express();
const User = require('../models/userModel');
const UserController = require('../controllers/userController');

router.get('/', async(req,res)=>{
    const users = await UserController.getAllUsers();
    res.send(users);
})

router.get('/:id', async(req,res)=>{
    const user = await UserController.getSpecificUser(req.params.id);
    res.send(user);
})

router.post('/register', async(req,res)=>{
    const user = await UserController.registerUser(req.body);
    res.send(user);
})

router.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserController.loginUser(email, password);
    res.send(user);
})

router.post('/', async (req,res)=>{
    const users = await UserController.getAllUsers();
    const new_user_id = users.length + 1;
    const new_user = {
        user_id : new_user_id,
        name : req.body.name,
        password : req.body.password,
        address : req.body.address,
        phone_no : req.body.phone_no,
        email : req.body.email,
        is_admin : req.body.is_admin,
        current_bulks_id : [],
        bulk_history : [],
        image : req.body.image,
        cart : [],
    }
    await ShopController.addNewShop(new_user);
})

router.post('/update', async (req,res) => {
    await UserController.updateUser(req.body.id, req.body.name, req.body.address, req.body.email, req.body.phone);
})

router.post('/update-bulks', async (req,res) => {
    await UserController.updateBulks(req.body.userId, req.body.currentBulks, req.body.bulkHistory);
})

router.post('/activate-bulk', async (req,res) => {
    await UserController.activateBulk(req.body.bulkId);
})

router.post('/deactivate-bulk', async (req,res) => {
    await UserController.deactivateBulk(req.body.bulkId);
})

router.post('/add-to-cart', async(req,res)=>{
    await UserController.addToCart(req.body.userId, req.body.addItem);
})

router.post('/delete-item-from-cart', async(req,res)=>{
    await UserController.deleteItemFromCart(req.body.userId, req.body.deleteItemIndex);
})

router.post('/update-cart-item-quantity', async(req,res)=>{
    await UserController.updateCartItemQuantity(req.body.userId, req.body.updateItemIndex, req.body.newQuantity);
})

router.post('/empty-the-cart', async(req,res)=>{
    const response = await UserController.emptyTheCart(req.body.userId);
    res.send(response);
})

module.exports = router;