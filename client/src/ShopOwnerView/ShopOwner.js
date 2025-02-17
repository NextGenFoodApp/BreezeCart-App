import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Link, Box, Paper } from '@mui/material';

const ShopOwnerPage = () => {
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
              sx={{ width: '200px' }}
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
      <Box display="flex" alignItems="center" gap="10px" margin='30px'>
        <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
          Products
        </Typography>
        <Button 
          variant="contained" 
          color="success"
          style={{ padding: '10px 20px' }}
        >
          Add New Product
        </Button>
      </Box>
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
                <CardContent display='flex' alignItems='center'>
                  <Typography variant="h6" component="h2">
                    {product.product_name}
                  </Typography>
                  <Typography variant="body2" align='center' color="textSecondary" component="p">
                    {product.price}
                  </Typography>
                  <Button variant="contained" align='center' style={{margin:'6px', fontSize:'12px'}} color="primary" onClick={() => {
                    window.location.href = `/products/${product.product_id}`
                  }}>View Product</Button>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" align='center' style={{margin:'6px', fontSize:'10px'}} color="warning" onClick={() => {
                      window.location.href = ``
                    }}>Hide</Button>
                    <Button variant="contained" align='center' style={{margin:'6px', fontSize:'10px'}} color="error" onClick={() => {
                      window.location.href = ``
                    }}>Remove</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ShopOwnerPage;
