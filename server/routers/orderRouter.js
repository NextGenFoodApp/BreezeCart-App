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
        user_id : req.body.userId,
        status : "Placed",
        items : req.body.itemList,
        total_price: req.body.totalPrice,
        shipping_address: req.body.shippingAddress 
    }
    await OrderController.addNewOrder(new_order);
})

// Cancel an order
router.patch('/:id/cancel', async (req, res) => {
  try {
    await OrderController.updateOrderStatus(req.params.id, 'Cancelled');
    res.status(200).send({ message: 'Order cancelled successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to cancel order' });
  }
})

// Mark order as complete
router.patch('/:id/complete', async (req, res) => {
  try {
    await OrderController.updateOrderStatus(req.params.id, 'Complete');
    res.status(200).send({ message: 'Order marked as complete' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to complete order' });
  }
})


module.exports = router;