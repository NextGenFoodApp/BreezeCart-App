import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    Typography,
    Link,
    Grid,
    Card,
    CardMedia,
    Button,
    TextField,
    Box,
    Chip,
    Tooltip,
    useTheme,
    Zoom,
    Divider, CircularProgress
} from '@mui/material';
import axios from 'axios';
import {
    ShoppingCart as CartIcon,
    ShoppingBasket as BulkIcon,
    Store as ShopIcon,
    Category as CategoryIcon,
    Info as InfoIcon
} from '@mui/icons-material';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectBulk from "../components/HomeComponents/SelectBulk";


const ProductPage = () => {
    const {id} = useParams();
    const theme = useTheme();
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [user, setUser] = useState(null);
    const [shop, setShop] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [imageHover, setImageHover] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productResponse = await axios.get(`http://localhost:3030/products/${id}`);
                setProduct(productResponse.data);
                setSelectedItem(productResponse.data.items.length === 1 ? productResponse.data.items[0] : null);

                const categoryResponse = await axios.get(`http://localhost:3030/categories/${productResponse.data.category_id}`);
                setCategory(categoryResponse.data);

                const shopResponse = await axios.get(`http://localhost:3030/shops/${productResponse.data.shop_id}`);
                setShop(shopResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (event) => {
        const value = Math.max(1, parseInt(event.target.value) || 1);
        setQuantity(value);
    };

    const handleAddToCart = async (itemId) => {
        console.log('Added product to cart: ', product.product_id);
        console.log('Added item: ', itemId);
        console.log('Added quantity: ', quantity);
        toast.success('Added to cart!');
        if (user) {
            await axios.post('http://localhost:3030/users/add-to-cart', {
                userId: user.user_id,
                addItem: {
                    item_id: itemId,
                    product_id: product.product_id,
                    quantity: +quantity
                }
            });
        } else {
            window.location.href = '/login';
        }
    };

    const handleAddToBulk = async (itemId) => {
        console.log('Added product to bulk: ', product.product_id);
        console.log('Added item: ', itemId);
        console.log('Added quantity: ', quantity);
        toast.success('Added to bulk!');
        if (user) {
            await axios.post('http://localhost:3030/bulks/add-to-bulk', {
                bulkId: JSON.parse(localStorage.getItem('bulk_id')),
                addItem: {
                    item_id: itemId,
                    product_id: product.product_id,
                    quantity: +quantity
                }
            });
        } else {
            window.location.href = '/login';
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    if (!product) {
        return <Box sx={{display: 'flex', justifyContent: 'center', p: 4}}><CircularProgress/></Box>;
    }

    return (
        <Box>
        <SelectBulk />
        <Grid container spacing={4} sx={{p: 4}}>
            <Grid item xs={12} md={6}>
                <Tooltip
                    title={product.product_name}
                    placement="top"
                    TransitionComponent={Zoom}
                >
                    <Card
                        sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            boxShadow: 3,
                            position: 'relative',
                            height: {xs: 300, md: 400}
                        }}
                        onMouseEnter={() => setImageHover(true)}
                        onMouseLeave={() => setImageHover(false)}
                    >
                        <CardMedia
                            component="img"
                            image={selectedItem ? selectedItem.image : product.image}
                            alt={product.product_name}
                            sx={{
                                transition: 'transform 0.4s ease',
                                transform: imageHover ? 'scale(2)' : 'scale(1)',
                                transformOrigin: 'center center',
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                backgroundColor: theme.palette.grey[100]
                            }}
                        />
                    </Card>
                </Tooltip>
            </Grid>

            <Grid item xs={12} md={6}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    px: 2
                }}>
                    {/* Product Header */}
                    <Box sx={{mb: 3}}>
                        <Typography variant="h4" component="h1" sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            color: theme.palette.text.primary
                        }}>
                            {product.product_name}
                        </Typography>

                        <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                            <Tooltip
                                title="Category"
                                placement="bottom"
                                TransitionComponent={Zoom}
                                arrow
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            fontSize: '0.9rem',
                                            boxShadow: 2,
                                            borderRadius: 1
                                        }
                                    },
                                }}
                            >
                                <Chip
                                    icon={<CategoryIcon/>}
                                    label={category?.category_name || 'Category'}
                                    size="small"
                                    component="a"
                                    href={`/categories/${product.category_id}`}
                                    clickable
                                    sx={{mr: 1, p: 2}}
                                />
                            </Tooltip>
                            <Tooltip
                                title="Shop"
                                placement="bottom"
                                TransitionComponent={Zoom}
                                arrow
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            fontSize: '0.9rem',
                                            boxShadow: 2,
                                            borderRadius: 1
                                        }
                                    },
                                }}
                            >
                                <Chip
                                    icon={<ShopIcon/>}
                                    label={shop?.shop_name || 'Shop'}
                                    size="small"
                                    component="a"
                                    href={`/shops/${product.shop_id}`}
                                    clickable
                                    sx={{mr: 1, p: 2}}
                                />
                            </Tooltip>
                        </Box>

                        <Divider sx={{my: 2}}/>
                    </Box>

                    {/* Product Variations */}
                    {product.items.length > 1 && (
                        <Box sx={{mb: 3}}>
                            <Typography variant="h6" sx={{
                                fontWeight: 'bold',
                                mb: 2,
                                color: theme.palette.text.secondary
                            }}>
                                Select {product.attribute}:
                            </Typography>

                            <Grid container spacing={2}>
                                {product.items.map(item => (
                                    <Grid item key={item.item_id}>
                                        <Tooltip title={`${item.unit} - $${item.price}`}>
                                            <Card
                                                onClick={() => handleItemClick(item)}
                                                sx={{
                                                    p: 1,
                                                    borderRadius: 2,
                                                    cursor: 'pointer',
                                                    border: `2px solid ${
                                                        selectedItem?.item_id === item.item_id
                                                            ? theme.palette.primary.main
                                                            : theme.palette.grey[300]
                                                    }`,
                                                    '&:hover': {
                                                        borderColor: theme.palette.primary.light,
                                                        boxShadow: 2
                                                    }
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={item.image}
                                                    alt={item.unit}
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        objectFit: 'contain',
                                                        borderRadius: 1
                                                    }}
                                                />
                                            </Card>
                                        </Tooltip>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    {/* Price Display */}
                    <Box sx={{mb: 3}}>
                        <Typography variant="h5" sx={{
                            fontWeight: 'bold',
                            color: theme.palette.primary.main
                        }}>
                            ${selectedItem ? selectedItem.price : product.items[0].price}
                            <Typography
                                component="span"
                                variant="body1"
                                color="text.secondary"
                                sx={{ml: 1}}
                            >
                                / {selectedItem ? selectedItem.unit : product.items[0].unit}
                            </Typography>
                        </Typography>
                    </Box>

                    {/* Quantity Selector and Total */}
                    <Box sx={{mb: 4, display: 'flex', alignItems: 'center', gap: 2}}>
                        <Box>
                            <Typography variant="subtitle1" sx={{mb: 0.5}}>
                                Quantity
                            </Typography>
                            <TextField
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                inputProps={{min: 1}}
                                variant="outlined"
                                size="small"
                                sx={{width: 100}}
                            />
                        </Box>

                        {quantity > 1 && (
                            <Typography
                                variant="body1"
                                sx={{
                                    mt: 6,
                                    fontWeight: 500,
                                    color: theme.palette.text.secondary,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Total:
                                ${((selectedItem ? selectedItem.price : product.items[0].price) * quantity).toFixed(2)}
                            </Typography>
                        )}
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        mt: 'auto'
                    }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CartIcon/>}
                            onClick={() => handleAddToCart(selectedItem ? selectedItem.item_id : product.items[0].item_id)}
                            disabled={!selectedItem && product.items.length > 1}
                            sx={{
                                flex: 1,
                                py: 1.5,
                                fontWeight: 'bold',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 3
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Add to Cart
                        </Button>

                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<BulkIcon/>}
                            onClick={() => handleAddToBulk(selectedItem ? selectedItem.item_id : product.items[0].item_id)}
                            disabled={!selectedItem && product.items.length > 1}
                            sx={{
                                flex: 1,
                                py: 1.5,
                                fontWeight: 'bold',
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    transform: 'translateY(-2px)',
                                    boxShadow: 3
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Add to Bulk
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <ToastContainer position="top-center" autoClose={7000} />
        </Grid>
        </Box>
    );
};

export default ProductPage;