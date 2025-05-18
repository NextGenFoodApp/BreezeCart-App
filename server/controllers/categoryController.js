const Category = require('../models/categoryModel');

exports.getAllCategories = async () => {
    try{
        const categories = await Category.find();
        console.log(categories);
        return categories;
    }
    catch(err){
        console.log(err);
    }
}

exports.getSpecificCategory = async (id) => {
    try{
        const category = await Category.findOne({category_id: id});
        console.log(category);
        return category;
    }
    catch(err){
        console.log(err);
    }
}

exports.addNewCategory = async (category) => {
    try{
        const newCategory = new Category(category);
        const addedCategory = await newCategory.save();
        console.log(addedCategory);
    }
    catch(err){
        console.log(err);
    }
}