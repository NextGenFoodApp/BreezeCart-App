import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';

// Shop Logo Grid
import ShopLogoGrid from './components/HomeComponents/ShopLogoGrid'

// Category Button Grid
import CategoryButtonGrid from './components/HomeComponents/CategoryButtonGrid';

// Styled Components
import HeroContent from './components/HomeComponents/HeroContent';
import CardContainer from './components/HomeComponents/CardContainer';
import CardIcon from './components/HomeComponents/CardIcon';

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
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="contained" color="primary" sx={{ borderRadius: 2, boxShadow: 3 }}>
                  Shop Now
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary" sx={{ borderRadius: 2, boxShadow: 3 }}>
                  Learn More
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </HeroContent>

      {/* Shops */}
      <ShopLogoGrid />

      {/* Categories */}
      <CategoryButtonGrid />

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
};

export default HomePage;
