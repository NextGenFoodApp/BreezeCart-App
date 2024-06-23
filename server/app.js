const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(body_parser.urlencoded({extended:true}));

const categoryRoutes = require('./routers/categoryRouter');
const productRoutes = require('./routers/productRouter');
const shopRoutes = require('./routers/shopRouter');
const userRoutes = require('./routers/userRouter');
const orderRoutes = require('./routers/orderRouter');
const bulkRoutes = require('./routers/bulkRouter');

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/shops', shopRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/bulks', bulkRoutes); 

module.exports = app;