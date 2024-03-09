const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/orderController');

router.get('/', async (req,res)=>{
    const orders = await OrderController.getAllOrders();
    res.send(orders);
})

router.get('/:id', async (req,res)=>{
    const order = await OrderController.getSpecificOrder(req.params.id);
    res.send(order);
})

router.post('/', async (req,res)=>{
    const orders = await OrderController.getAllOrders();
    const new_order_id = orders.length + 1;
    const new_order = {
        order_id : new_order_id,
        user_id : req.body.user_id,
        shop_id : req.body.shop_id,
        type : req.body.type,
        status : req.body.status,
        items : []
    }
    await OrderController.addNewOrder(new_order);
})

module.exports = router;