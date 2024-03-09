const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productController');

router.get('/', async (req,res)=>{
    const products = await ProductController.getAllProducts();
    res.send(products);
})

router.get('/:id', async (req,res)=>{
    const product = await ProductController.getSpecificProduct(req.params.id);
    res.send(product);
})

router.post('/', async (req,res)=>{
    const products = await ProductController.getAllProducts();
    const new_product_id = products.length + 1;
    const new_product = {
        product_id : new_product_id,
        product_name : req.body.product_name,
        category_id : req.body.category_id,
        shop_id : req.body.shop_id,
        price : req.body.price,
        items : []
    }
    await ProductController.addNewProduct(new_product);
})

module.exports = router;