const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/categoryController');

router.get('/', async (req,res)=>{
    const categories = await CategoryController.getAllCategories();
    res.send(categories);
})

router.get('/:id', async (req,res)=>{
    const category = await CategoryController.getSpecificCategory(req.params.id);
    res.send(category);
})

router.post('/', async (req,res)=>{
    const categories = await CategoryController.getAllCategories();
    const new_category_id = categories.length + 1;
    const new_category = {
        category_id : new_category_id,
        category_name : req.body.category_name
    }
    await CategoryController.addNewCategory(new_category);
})

module.exports = router;