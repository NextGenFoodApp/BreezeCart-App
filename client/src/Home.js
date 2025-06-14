import React, {useRef} from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, Box, useTheme, useMediaQuery } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

// Shop Logo Grid
import ShopLogoGrid from './components/HomeComponents/ShopLogoGrid';

// Category Button Grid
import CategoryButtonGrid from './components/HomeComponents/CategoryButtonGrid';
import ReviewsCarousel from './components/HomeComponents/ReviewCarousel';

const HomePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const categoryRef = useRef(null);

    return (
        <Box sx={{overflowX: 'hidden'}}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)',
                    color: 'white',
                    py: 10,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '0px',
                        background: 'white',
                        // Changed to horizontal divider
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
                    }
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{
                        opacity: 1,
                        transform: 'translateY(0)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease'
                    }}>
                        <Typography
                            component="h1"
                            variant={isMobile ? 'h3' : 'h2'}
                            align="center"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            Welcome to BreezeCart
                        </Typography>
                        <Typography
                            variant={isMobile ? 'h6' : 'h5'}
                            align="center"
                            paragraph
                            sx={{mb: 4}}
                        >
                            Your Groceries, Just a Click Away
                        </Typography>
                    </Box>

                    <Box sx={{
                        opacity: 1,
                        transform: 'translateY(0)',
                        transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s'
                    }}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    endIcon={<ArrowForward/>}
                                    onClick={() => {
                                        categoryRef.current?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    sx={{
                                        borderRadius: 50,
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 'bold',
                                        boxShadow: 4,
                                        '&:hover': {
                                            transform: 'translateY(-3px)',
                                            boxShadow: 6
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Shop Now
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    size="large"
                                    sx={{
                                        borderRadius: 50,
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 'bold',
                                        borderWidth: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                            borderWidth: 2
                                        }
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>

            {/* Shops Section */}
            <Box sx={{py: 8, bgcolor: 'background.paper'}}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            mb: 6,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '80px',
                                height: '4px',
                                background: theme.palette.primary.main,
                                margin: '16px auto 0'
                            }
                        }}
                    >
                        Our Partner Stores
                    </Typography>
                    <ShopLogoGrid/>
                </Container>
            </Box>

            {/* Categories Section */}
            <Box ref={categoryRef} sx={{py: 8, bgcolor: 'grey.50'}}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            mb: 6,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '80px',
                                height: '4px',
                                background: theme.palette.primary.main,
                                margin: '16px auto 0'
                            }
                        }}
                    >
                        Shop by Category
                    </Typography>
                    <CategoryButtonGrid/>
                </Container>
            </Box>

            <Box sx={{pb: 12, bgcolor: 'background.paper'}}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            mb: 6,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '80px',
                                height: '4px',
                                background: theme.palette.primary.main,
                                margin: '16px auto 0'
                            }
                        }}
                    >
                        Why Choose BreezeCart?
                    </Typography>
                    <Grid container spacing={4}>
                        {[
                            {
                                icon: "🛒",
                                title: "Shop Anytime, Anywhere",
                                description: "Browse our wide selection of groceries and order from the comfort of your home."
                            },
                            {
                                icon: "🚚",
                                title: "Fast Delivery",
                                description: "Enjoy quick and reliable delivery right to your doorstep."
                            },
                            {
                                icon: "💳",
                                title: "Secure Payments",
                                description: "Your payments are safe and secure with our trusted payment gateway."
                            }
                        ].map((feature, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        p: 4,
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: 6
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Typography variant="h3" sx={{mb: 2}}>
                                        {feature.icon}
                                    </Typography>
                                    <CardContent>
                                        <Typography variant="h6" component="h3" gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* New Reviews Section */}
            <Box sx={{py: 8, bgcolor: 'grey.50'}}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            mb: 6,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '120px',
                                height: '4px',
                                background: theme.palette.primary.main,
                                margin: '16px auto 0'
                            }
                        }}
                    >
                        Customer Reviews
                    </Typography>
                    <ReviewsCarousel/>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;