import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import styled from '@mui/material/styles/styled';

// Shop Logo Grid
const ShopLogoGrid = () => {
  const [images, setImages] = useState([]);

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
            <Button onClick={() =>
                      (window.location.href = `http://localhost:3000/shops/${image.shop_id}`)
                    }>
              <Card>
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
};

// Category Button Grid
const CategoryButtonGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3030/categories')
      .then(response => {
        setCategories(response.data.map(category => category));
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <Container maxWidth="md">
      <HeroContent>
      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
            <Button onClick={() =>
                      (window.location.href = `http://localhost:3000/categories/${category.category_id}`)
                    }>
              {category.category_name}
            </Button>
          </Grid>
        ))}
      </Grid>
      </HeroContent>
    </Container>
  );
};


const HeroContent = styled('div')({
  backgroundColor: theme => theme.palette.background.paper,
  padding: theme => theme.spacing(8, 0, 6),
  marginTop: 30,
  marginBottom: 60,
});

const CardContainer = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme => theme.spacing(2),
  minHeight: '200px',
  borderRadius: theme => theme.spacing(1),
  boxShadow: theme => theme.shadows[3],
});

const CardIcon = styled(Typography)({
  fontSize: '4rem',
  marginBottom: theme => theme.spacing(2),
});

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroContent>
        <Container maxWidth="md">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Welcome to BreezeCart
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Follow Your Doorstep
          </Typography>
          <div className="heroButtons">
            <Grid container spacing={2} justifyContent="center" justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  Shop Now
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Learn More
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </HeroContent>

      {/* Shops */}
      <ShopLogoGrid/>

      {/* Categories */}
      <CategoryButtonGrid/>

      {/* Features Section */}
      <HeroContent>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Our Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <CardContainer>
              <CardIcon variant="h3" color="primary">
                🛒
              </CardIcon>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Shop Anytime, Anywhere
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Browse our wide selection of groceries and order from the comfort of your home.
                </Typography>
              </CardContent>
            </CardContainer>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardContainer>
              <CardIcon variant="h3" color="primary">
                🚚
              </CardIcon>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Fast Delivery
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Enjoy quick and reliable delivery right to your doorstep.
                </Typography>
              </CardContent>
            </CardContainer>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardContainer>
              <CardIcon variant="h3" color="primary">
                💳
              </CardIcon>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Secure Payments
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Your payments are safe and secure with our trusted payment gateway.
                </Typography>
              </CardContent>
            </CardContainer>
          </Grid>
        </Grid>
      </Container>
      </HeroContent>

    </div>
  );
}

export default HomePage;
