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

module.exports = router;