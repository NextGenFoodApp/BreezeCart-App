import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const ShopPage = () => {
  const { id } = useParams();
  const [shopDetails, setShopDetails] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect( () => {
    // Fetch shop details
    axios.get(`http://localhost:3030/shops/${id}`)
      .then(response => {
        setShopDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching shop details:', error);
      });

    // Fetch products of the shop
    axios.get(`http://localhost:3030/products/s/${id}`)
      .then(response => {
        setProducts(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [id]);

  const handleAddToCart = (productId) => {
    // Implement functionality to add product to cart
    console.log('Added product to cart:', productId);
  };

  const handleAddToBulk = (productId) => {
    // Implement functionality to add product to bulk
    console.log('Added product to bulk:', productId);
  };

  return (
    <Container maxWidth="md">
      {shopDetails && (
        <div>
          <Typography variant="h4" gutterBottom>
            {shopDetails.name}
          </Typography>
          <Card>
            <CardMedia
              component="img"
              alt={shopDetails.name}
              image={shopDetails.logo}
              title={shopDetails.name}
            />
            <CardContent>
              <Typography variant="h4" color="textSecondary">
                {shopDetails.shop_name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Address: {shopDetails.address}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Phone: {shopDetails.phone_no}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Email: {shopDetails.email}
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                alt={product.product_name}
                image={product.image}
                title={product.product_name}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.price}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleAddToCart(product.id)}>Add to my cart</Button>
                <Button variant="contained" color="secondary" onClick={() => handleAddToBulk(product.id)}>Add to my bulk</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShopPage;
