import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import styled from '@mui/material/styles/styled';

// Logo Slider

const RootContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
    height: '100%',
  });
  
  const SliderContainer = styled('div')({
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '100%',
    height: 600,
    borderRadius: '8px', // Adjust as needed
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', // Adjust as needed
  });
  
  const Slider = styled('div')({
    display: 'flex',
    transition: 'transform 0.5s ease',
  });
  
  const Slide = styled('div')({
    minWidth: '40%',
    flex: 1,
  });
  
  const SlideCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  });
  
  const SlideCardContent = styled(CardContent)({
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    padding: '16px',
  });
  
  const LogoSlider = () => {
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
  
    useEffect(() => {
      axios.get('http://localhost:3030/shops')
        .then(response => {
          setImages(response.data.map(shop => shop.logo));
        })
        .catch(error => {
          console.error('Error fetching images:', error);
        });
    }, []);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide(current => (current === images.length - 1 ? 0 : current + 1));
      }, 3000);
  
      return () => clearInterval(interval);
    }, [images]);
  
    const handlePrevSlide = () => {
      setCurrentSlide(current => (current === 0 ? images.length - 1 : current - 1));
    };
  
    const handleNextSlide = () => {
      setCurrentSlide(current => (current === images.length - 1 ? 0 : current + 1));
    };
  
    return (
      <Container maxWidth="md">
        <RootContainer>
          <SliderContainer>
            <Slider style={{ transform: `translateX(-${currentSlide * (100 / images.length)}%)` }}>
              {images.map((image, index) => (
                <Slide key={index}>
                  <SlideCard>
                    <CardMedia
                      component="img"
                      alt={`Shop ${index}`}
                      src={image}
                      title={`Shop ${index}`}
                    />
                    <SlideCardContent>
                      <Typography variant="h5" component="h2">
                        Shop {index + 1}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Description of the shop
                      </Typography>
                    </SlideCardContent>
                  </SlideCard>
                </Slide>
              ))}
            </Slider>
            <Button onClick={handlePrevSlide}>Prev</Button>
            <Button onClick={handleNextSlide}>Next</Button>
          </SliderContainer>
        </RootContainer>
      </Container>
    );
  };


const HeroContent = styled('div')({
  backgroundColor: theme => theme.palette.background.paper,
  padding: theme => theme.spacing(8, 0, 6),
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
            Your one-stop solution for all grocery needs.
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
      <LogoSlider/>

      {/* Features Section */}
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

      {/* Testimonials Section */}
      <Container maxWidth="md">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          What Our Customers Say
        </Typography>
        {/* Testimonials Cards */}
        {/* Add your testimonials here */}
      </Container>

      {/* Call to Action Section */}
      <Container maxWidth="md">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Ready to Get Started?
        </Typography>
        <div className="heroButtons">
          <Grid container spacing={2} justify="center">
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
    </div>
  );
}

export default HomePage;
