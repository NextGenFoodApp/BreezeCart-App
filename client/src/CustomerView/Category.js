import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Link } from '@mui/material';

const CategoryPage = () => {
  const { id } = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect( () => {
    // Fetch category details
    axios.get(`http://localhost:3030/categories/${id}`)
      .then(response => {
        setCategoryDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching shop details:', error);
      });

    // Fetch products of the category
    axios.get(`http://localhost:3030/products/c/${id}`)
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
      {categoryDetails && (
        <div>
          <Typography variant="h4" gutterBottom>
            {categoryDetails.category_name}
          </Typography>
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
                  <Button variant="contained" color="primary" onClick={() => {
                    window.location.href = `http://localhost:3000/products/${product.product_id}`
                  }}>View Product</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default CategoryPage;
