import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Grid, Card, CardMedia } from '@mui/material';
import HeroContent from "./HeroContent";

const ShopLogoGrid = () => {
    const [images, setImages] = useState([]);
  
    const shop = localStorage.getItem('shop');
  
    useEffect(() => {
      axios.get('http://localhost:3030/shops')
        .then(response => {
          setImages(response.data.map(shop => shop));
        })
        .catch(error => {
          console.error('Error fetching images:', error);
        });
    }, []);
  
    return (
      <Container maxWidth="md">
        <HeroContent>
        <Grid container spacing={3}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
              <Button
                onClick={() =>
                  (window.location.href = (shop && JSON.parse(shop).shop_id === image.shop_id) 
                    ? `/shop-owners/${image.shop_id}` 
                    : `/shops/${image.shop_id}`
                  )
                }
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    backgroundColor: '#e0f7fa',
                  },
                }}
              >
                <Card sx={{ borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    alt={`Shop ${index}`}
                    image={image.logo}
                    title={`Shop ${index}`}
                  />
                </Card>
              </Button>
            </Grid>
          ))}
        </Grid>
        </HeroContent>
      </Container>
    );
  }

  export default ShopLogoGrid;