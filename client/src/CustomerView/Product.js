import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Link, Grid, Card, CardMedia, Button, TextField } from '@mui/material';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [shop, setShop] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`http://localhost:3030/products/${id}`);
        setProduct(productResponse.data);

        const categoryResponse = await axios.get(`http://localhost:3030/categories/${productResponse.data.category_id}`);
        setCategory(categoryResponse.data);

        const shopResponse = await axios.get(`http://localhost:3030/shops/${productResponse.data.shop_id}`);
        setShop(shopResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = (productId) => {
    // Implement functionality to add product to cart
    console.log('Added product to cart:', productId);
  };

  const handleAddToBulk = (productId) => {
    // Implement functionality to add product to bulk
    console.log('Added product to bulk:', productId);
  };

  return (
    <Grid container spacing={3}>
      {product && (
        <>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.product_name}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="textSecondary" component="p">
                <Link href={`http://localhost:3000/categories/${product.category_id}`}>
                {category && category.category_name}
                </Link>
            </Typography>
            <Typography variant="h5" component="h1">
                {product.product_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                From<spacing> </spacing>
                <Link href={`http://localhost:3000/shops/${product.shop_id}`}>
                    {shop && shop.shop_name}
                </Link>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Variations:
            </Typography>
            {product.items.map(item => (
              <Typography key={item.item_id} variant="body1">
                Size: {item.size}, Price: ${item.price}
              </Typography>
            ))}
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
              style={{ marginBottom: '16px' }}
            />
            <Button variant="contained" color="primary" onClick={() => handleAddToCart(product.id)}>Add to my cart</Button>
            <Button variant="contained" color="secondary" onClick={() => handleAddToBulk(product.id)}>Add to my bulk</Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ProductPage;
