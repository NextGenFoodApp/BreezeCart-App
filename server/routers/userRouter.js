const express = require('express');
const router = express();
const User = require('../models/userModel');
const UserController = require('../controllers/userController');

router.get('/', async(req,res)=>{
    const users = await UserController.getAllUsers();
    res.send(users);
})

router.get('/:id', async(req,res)=>{
    const user = await UserController.getSpecificUsers(req.params.id);
    res.send(user);
})

router.post('/register', async(req,res)=>{
    await UserController.registerUser(req.body);
})

router.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    await UserController.loginUser(email, password);
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
        image : req.body.image
    }
    await ShopController.addNewShop(new_user);
})

module.exports = router;