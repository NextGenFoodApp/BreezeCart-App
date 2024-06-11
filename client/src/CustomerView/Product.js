import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Link, Grid, Card, CardMedia, Button, TextField, Box } from '@mui/material';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [shop, setShop] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [selectedItem, setSelectedItem] = useState(null); // State for selected variation item

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

  const handleAddToCart = (productId) => {
    // Implement functionality to add product to cart
    console.log('Added product to cart:', productId);
  };

  const handleAddToBulk = (productId) => {
    // Implement functionality to add product to bulk
    console.log('Added product to bulk:', productId);
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
                  onClick={() => handleAddToCart(product.id)}
                  sx={{ flex: 1 }}
                >
                  Add to my cart
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleAddToBulk(product.id)}
                  sx={{ flex: 1 }}
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
