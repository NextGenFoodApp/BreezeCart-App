const express = require('express');
const router = express.Router();

const BulkOrderController = require('../controllers/bulkOrderController');

router.get('/', async (req,res)=>{
    const bulkOrders = await BulkOrderController.getAllBulkOrders();
    res.send(bulkOrders);
})

router.get('/:id', async (req,res)=>{
    const bulkOrder = await BulkOrderController.getSpecificBulkOrder(req.params.id);
    res.send(bulkOrder);
})

router.post('/', async (req,res)=>{
    const bulkOrders = await BulkOrderController.getAllBulkOrders();
    const new_order_id = bulkOrders.length + 1;
    const new_order = {
        bulk_order_id : new_order_id,
        user_id : req.body.userId,
        bulk_id : req.body.bulkId,
        paid_times : req.body.timesCount,
        items: req.body.items,
        bulk_value: req.body.bulkValue,
        paid_amount: req.body.paidAmount  
    }
    await BulkOrderController.addNewBulkOrder(new_order);
})

module.exports = router;