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

// Add an item to cart 
exports.addToCart = async (id, item) => {
    try{
        const user = await User.findOne({user_id : id});
        let userCart = user.cart;
        let updated = false;
        userCart.map((i,index) => {
            if(i.product_id === item.product_id && i.item_id === item.item_id){
                userCart[index].quantity += item.quantity;
                updated = true;
            }
        });
        if(!updated) userCart.push(item); 
        await User.updateOne(
            {user_id : id},
            {$set: {cart: userCart}}
        );
    }
    catch(err){
        console.log(err);
    }
}

// Delete an item from the cart
exports.deleteItemFromCart = async (id, index) => {
    try{
        const user = await User.findOne({user_id : id});
        let userCart = user.cart;
        const newCart = userCart.filter((_,i) => i !== index);
        console.log(index);
        console.log(newCart);
        await User.updateOne(
            {user_id : id},
            {$set: {cart: newCart}}
        );
    }
    catch(err){
        console.log(err);
    }
}

// Update quantity of a cart item 
exports.updateCartItemQuantity = async (id, index, newQuantity) => {
    try{
        const user = await User.findOne({user_id : id});
        let userCart = user.cart;
        userCart[index].quantity = newQuantity;
        await User.updateOne(
            {user_id : id},
            {$set: {cart: userCart}}
        );
    }
    catch(err){
        console.log(err);
    }
}

