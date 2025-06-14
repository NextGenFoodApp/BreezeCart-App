import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardActionArea,
    CardContent,
    Typography,
    Box,
    useTheme,
    useMediaQuery,
    Chip,
    Skeleton
} from '@mui/material';
import { Storefront, Star } from '@mui/icons-material';

const ShopLogoGrid = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const shop = localStorage.getItem('shop');

    useEffect(() => {
        axios.get('http://localhost:3030/shops')
            .then(response => {
                setShops(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching shops:', error);
                setLoading(false);
            });
    }, []);

    const handleShopClick = (shopId) => {
        window.location.href = (shop && JSON.parse(shop).shop_id === shopId
            ? `/shop-owners/${shopId}`
            : `/shops/${shopId}`);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {loading ? (
                <Grid container spacing={isMobile ? 2 : 4}>
                    {[...Array(6)].map((_, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={isMobile ? 160 : 200}
                                sx={{ borderRadius: 2 }}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Grid container spacing={isMobile ? 2 : 4}>
                    {shops.map((shopItem) => (
                        <Grid
                            item
                            xs={6}
                            sm={4}
                            md={3}
                            key={shopItem.shop_id}
                            sx={{
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.03)'
                                }
                            }}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    border: `1px solid ${theme.palette.divider}`,
                                    '&:hover': {
                                        boxShadow: 6,
                                        borderColor: theme.palette.secondary.light
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <CardActionArea
                                    onClick={() => handleShopClick(shopItem.shop_id)}
                                    sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start'
                                    }}
                                >
                                    <Box sx={{
                                        width: '100%',
                                        height: isMobile ? 120 : 160,
                                        position: 'relative',
                                        backgroundColor: '#b3e5fc',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {shopItem.logo ? (
                                            <CardMedia
                                                component="img"
                                                alt={shopItem.shop_name}
                                                image={shopItem.logo}
                                                sx={{
                                                    maxHeight: '80%',
                                                    maxWidth: '80%',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        ) : (
                                            <Storefront
                                                fontSize="large"
                                                sx={{
                                                    color: theme.palette.grey[400],
                                                    fontSize: '3rem'
                                                }}
                                            />
                                        )}
                                        {shopItem.rating && (
                                            <Chip
                                                icon={<Star fontSize="small" />}
                                                label={shopItem.rating.toFixed(1)}
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    backgroundColor: theme.palette.warning.light,
                                                    color: theme.palette.getContrastText(theme.palette.warning.light)
                                                }}
                                            />
                                        )}
                                    </Box>
                                    <CardContent sx={{ width: '100%' }}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            sx={{
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                color: theme.palette.text.primary
                                            }}
                                        >
                                            {shopItem.shop_name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                textAlign: 'center',
                                                mt: 1
                                            }}
                                        >
                                            {shopItem.category || 'General Store'}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default ShopLogoGrid;