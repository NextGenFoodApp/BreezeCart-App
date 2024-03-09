const User = require('../models/userModel');

exports.getAllUsers = async () => {
    try{
        const users = await User.find();
        return users;
    }
    catch(err){
        console.log(err);
    }
}

exports.getSpecificUser = async (id) => {
    try{
        const user = await User.findOne({user_id : id});
        return user;
    }
    catch(err){
        console.log(err);
    }
}

exports.registerUser = async (new_user) => {
    try{
        const newUser = new User(new_user);
        const user = await newUser.save();
        console.log("You registered successfully.");
        console.log(user);
        return user;
    }
    catch(err){
        console.log(err);
    }
}

exports.loginUser = async (email, password) => {
    try{
        const user = await User.findOne({email:email, password:password});
        console.log(user);
        return user;
    }
    catch(err){
        console.log(err);
    }
}