import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Button,
    Grid,
    Typography,
    Box,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    LocalGroceryStore as GroceryIcon,
    Fastfood as FoodIcon,
    LocalDrink as DrinkIcon,
    Kitchen as KitchenIcon,
    Icecream as FrozenIcon,
    MedicalServices as HealthIcon,
    Pets as PetsIcon,
    Spa as BeautyIcon,
    CleaningServices as CleaningIcon,
    ChildFriendly as BabyIcon
} from '@mui/icons-material';

const categoryIcons = {
    'Groceries': <GroceryIcon fontSize="large" />,
    'Food': <FoodIcon fontSize="large" />,
    'Beverages': <DrinkIcon fontSize="large" />,
    'Kitchen': <KitchenIcon fontSize="large" />,
    'Frozen': <FrozenIcon fontSize="large" />,
    'Health': <HealthIcon fontSize="large" />,
    'Pets': <PetsIcon fontSize="large" />,
    'Beauty': <BeautyIcon fontSize="large" />,
    'Cleaning': <CleaningIcon fontSize="large" />,
    'Baby': <BabyIcon fontSize="large" />
};

const CategoryButtonGrid = () => {
    const [categories, setCategories] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    useEffect(() => {
        axios.get('http://localhost:3030/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const getCategoryIcon = (categoryName) => {
        return categoryIcons[categoryName] || <GroceryIcon fontSize="large" />;
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>

            <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
                {categories.map((category, index) => (
                    <Grid
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        lg={2.4}
                        key={category.category_id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)'
                            }
                        }}
                    >
                        <Button
                            onClick={() => (window.location.href = `/categories/${category.category_id}`)}
                            variant="contained"
                            sx={{
                                width: '100%',
                                height: '100%',
                                minHeight: isMobile ? '100px' : '140px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                borderRadius: 3,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                color: theme.palette.primary.contrastText,
                                boxShadow: 3,
                                '&:hover': {
                                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                                    boxShadow: 6
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Box sx={{ mb: 1 }}>
                                {getCategoryIcon(category.category_name)}
                            </Box>
                            <Typography
                                variant={isMobile ? 'body2' : 'body1'}
                                sx={{
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    textAlign: 'center'
                                }}
                            >
                                {category.category_name}
                            </Typography>
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default CategoryButtonGrid;