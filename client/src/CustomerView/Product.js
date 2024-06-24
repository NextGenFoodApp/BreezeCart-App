import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Link, Grid, Card, CardMedia, Button, TextField, Box } from '@mui/material';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [user, setUser] = useState(null);
  const [shop, setShop] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [selectedItem, setSelectedItem] = useState(null); // State for selected variation item

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        console.log(localStorage);
        console.log(localStorage.getItem('user'))
        console.log(storedUser);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log('Parsed user:', parsedUser);
        } else {
          console.error('No user found in localStorage');
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
    setQuantity(event.target.value);
  };

  const handleAddToCart = async (itemId) => {
    console.log('Added product to cart: ', product.product_id);
    console.log('Added item: ', itemId);
    console.log('Added quantity: ', quantity);
    if(user) await axios.post('http://localhost:3030/users/add-to-cart',
      {
        userId: user.user_id,
        addItem: {
          item_id: itemId,
          product_id: product.product_id,
          quantity: +quantity
        }
      }
    );
    else window.location.href = '/login';
  };

  const handleAddToBulk = async (itemId) => {
    console.log('Added product to bulk:', product.product_id);
    console.log('Added item: ', itemId);
    console.log('Added quantity: ', quantity);
    if(user) await axios.post('http://localhost:3030/bulks/add-to-bulk',
      {
        bulkId: JSON.parse(localStorage.getItem('bulk_id')),
        addItem: {
          item_id: itemId,
          product_id: product.product_id,
          quantity: +quantity
        }
      }
    );
    else window.location.href = '/login';
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {product && (
        <>
          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #ccc', padding: 2 }}>
              <CardMedia
                component="img"
                image={selectedItem ? selectedItem.image : product.image}
                alt={product.product_name}
                sx={{ borderRadius: 2 }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="body2" color="textSecondary" component="p" sx={{ marginBottom: 1 }}>
                <Link href={`http://localhost:3000/categories/${product.category_id}`} underline="hover">
                  {category && category.category_name}
                </Link>
              </Typography>
              <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
                {product.product_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" sx={{ marginBottom: 2 }}>
                From<spacing> </spacing>
                <Link href={`http://localhost:3000/shops/${product.shop_id}`} underline="hover">
                  {shop && shop.shop_name}
                </Link>
              </Typography>
              {product.items.length > 1 && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
                    {product.attribute}:
                  </Typography>
                  <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                    {product.items.map(item => (
                      <Grid item key={item.item_id}>
                        <Card
                          onClick={() => handleItemClick(item)}
                          sx={{
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            cursor: 'pointer',
                            '&:hover': { borderColor: 'primary.main' }
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={item.image}
                            alt={item.unit}
                            sx={{ width: 50, height: 50, objectFit: 'cover' }}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
              {selectedItem && product.items.length > 1 && (
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  {selectedItem.unit}, Price: ${selectedItem.price}
                </Typography>
              )}
              {product.items.length === 1 && (
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  {product.items[0].unit}, Price: ${product.items[0].price}
                </Typography>
              )}
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1 }}
                sx={{ marginBottom: 2 }}
                fullWidth
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(selectedItem ? selectedItem.item_id : 1)}
                  sx={{ flex: 1 }}
                  disabled={!selectedItem && product.items.length > 1}
                >
                  Add to my cart
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleAddToBulk(selectedItem ? selectedItem.item_id : 1)}
                  sx={{ flex: 1 }}
                  disabled={!selectedItem && product.items.length > 1}
                >
                  Add to my bulk
                </Button>
              </Box>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ProductPage;
