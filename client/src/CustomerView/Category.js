import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    useTheme
} from '@mui/material';

const CategoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    const [categoryDetails, setCategoryDetails] = useState(null);
    const [products, setProducts] = useState([]);
    const [hoveredProduct, setHoveredProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3030/categories/${id}`)
            .then(response => {
                setCategoryDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching category details:', error);
            });

        axios.get(`http://localhost:3030/products/c/${id}`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [id]);

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {categoryDetails && (
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    {categoryDetails.category_name}
                </Typography>
            )}

            <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
                Products
            </Typography>

            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.product_id}>
                        <Card
                            onClick={() => handleProductClick(product.product_id)}
                            onMouseEnter={() => setHoveredProduct(product.product_id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 3,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                backgroundColor: '#fce4ec',
                                border: `1px solid ${theme.palette.divider}`,
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6,
                                    borderColor: theme.palette.primary.main
                                }
                            }}
                        >
                            <CardMedia
                                component="img"
                                alt={product.product_name}
                                image={product.image}
                                title={product.product_name}
                                sx={{
                                    height: 200,
                                    objectFit: 'contain',
                                    backgroundColor: theme.palette.grey[100],
                                    transition: 'transform 0.3s ease',
                                    transform: hoveredProduct === product.product_id ? 'scale(1.05)' : 'scale(1)'
                                }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    {product.product_name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CategoryPage;
