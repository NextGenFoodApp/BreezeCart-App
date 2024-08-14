import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const ShopInfo = () => {
  const [shopId, setShopId] = useState(0);
  const [shop, setShop] = useState({
    shopName: '',
    shopOwner: '',
    address: '',
    postalCode: 0,
    phone: '',
    email: '',
    logo: ''
  });

  const [editField, setEditField] = useState(null);

  useEffect(() => {
    const storedShop = localStorage.getItem('shop');
    const parsedShop = JSON.parse(storedShop);
    const shopId = parsedShop.shop_id;
    setShopId(shopId);
    axios.get(`http://localhost:3030/shops/${shopId}`)
      .then(response => {
        const data = response.data;
        setShop({
          shopName: data.shop_name,
          shopOwner: data.shop_owner,
          address: data.address,
          postalCode: data.postal_code, 
          email: data.email,
          phone: data.phone_no,
          logo: data.logo
        });
      })
      .catch(error => {
        console.error('There was an error fetching the shop data!', error);
      });
  }, []);

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShop({ ...shop , [name]: value });
  };

  const handleSaveClick = () => {
    setEditField(null);
    axios.post(`http://localhost:3030/shops/update`, {
        shop_id: shopId,
        shop_name: shop.shopName,
        shop_owner: shop.shopOwner,
        address: shop.address,
        postal_code: shop.postalCode,
        email: shop.email,
        phone: shop.phone
    });
  };

  return (
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <CardMedia
                            component="img"
                            alt={`Shop ${shopId}`}
                            image={shop.logo}
                            title={`Shop ${shopId}`}
                            sx={{ width: '200px' }}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
            <Card>
                <CardContent>
                    {['shopName', 'shopOwner', 'address', 'postalCode', 'email', 'phone'].map((field, index) => (
                    <Grid container key={index} alignItems="center" spacing={1}>
                        <Grid item xs={5}>
                        <Typography variant="body1">
                            {field.replace(/^\w/, (c) => c.toUpperCase())}:
                        </Typography>
                        </Grid>
                        <Grid item xs={5}>
                        {editField === field ? (
                            <TextField
                            fullWidth
                            variant="standard"
                            name={field}
                            value={shop[field]}
                            onChange={handleInputChange}
                            />
                        ) : (
                            <Typography variant="body2">
                            {field.includes('address.') ? shop.address[field.split('.')[1]] : shop[field]}
                            </Typography>
                        )}
                        </Grid>
                        <Grid item xs={2}>
                        {editField === field ? (
                            <Button variant="contained" color="primary" onClick={handleSaveClick}>✔️</Button>
                        ) : (
                            <Button variant="outlined" onClick={() => handleEditClick(field)}>Edit</Button>
                        )}
                        </Grid>
                    </Grid>
                    ))}
                </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Container>
  );
};

export default ShopInfo;
