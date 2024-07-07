import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography, Button, Grid, Box, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';

const Checkout = () => {
  const [user, setUser] = useState({});
  const [cart,setCart] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [shippingAddress1, setShippingAddress1] = useState('');
  const [shippingAddress2, setShippingAddress2] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingPostcode, setShippingPostcode] = useState('');
  const [properlyFilled, setProperlyFilled] = useState(true);

  const fetchUser = () => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser.user_id;
    console.log(userId);
    if (userId) {
      axios.get(`http://localhost:3030/users/${userId}`)
        .then(response => {
          setUser(response.data);
          setCart(response.data.cart);
          console.log(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the user data!', error);
        });
    }
  }

  useEffect(() => {
    fetchUser(); 
  }, []);

  const fetchCartDetails = async () => {
    const cartDetails = await Promise.all(cart.map(async (cartItem) => {
      try {
        const productResponse = await axios.get(`http://localhost:3030/products/${cartItem.product_id}`);
        const product = productResponse.data;
        const item = product.items.find(item => item.item_id === cartItem.item_id);
        return {
          product_name: product.product_name,
          unit: item.unit,
          unit_price: item.price,
          quantity: cartItem.quantity,
          total_price: item.price * cartItem.quantity
        };
      } catch (error) {
        console.error('Error fetching product data:', error);
        return null;
      }
    }));

    setCartDetails(cartDetails.filter(detail => detail !== null));
  };

  useEffect(() => {
    if (cart.length > 0) {
      fetchCartDetails();
    }
  }, [cart]);

  const calculateTotal = () => {
    return cartDetails.reduce((total, item) => total + item.total_price, 0);
  };


  const handleCheckboxChange = (event) => {
    setShipToDifferentAddress(event.target.checked);
  };

  const handlePlaceOrder = async () => {
    await fetchUser();
    await fetchCartDetails();
    const cartItems = user.cart;
    const address = user.address;
    let shippingAddress;
    let isProperlyFilled = true;
    if(shipToDifferentAddress){
      if(shippingAddress1 && shippingAddress2 && shippingCity && shippingPostcode){
        shippingAddress = {
        address_line_1: shippingAddress1,
        address_line_2: shippingAddress2,
        city: shippingCity,
        postcode: shippingPostcode
        };
        setProperlyFilled(true);
        isProperlyFilled = true;
      } else{
        setProperlyFilled(false);
        isProperlyFilled = false;
      }
    } else{
      shippingAddress = address;
    }
    if(isProperlyFilled){
      await axios.post(`http://localhost:3030/orders/`,{
        userId: user.user_id,
        itemList: cartDetails,
        shippingAddress: shippingAddress,
        totalPrice: calculateTotal().toFixed(2) 
      });
      const response = await axios.post(`http://localhost:3030/users/empty-the-cart`,{
        userId: user.user_id  
      });
      console.log(response);
    }
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      
      <Box component="form" sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={user.name && user.name.first_name || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={user.name && user.name.last_name || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="companyName"
              name="companyName"
              label="Company name"
              fullWidth
              variant="standard"
              value={user.company_name}
              InputProps={{
                readOnly: false,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Street address"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={user.address && user.address.address_line_1 || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Apartment, suite, etc. (optional)"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              value={user.address && user.address.address_line_2 || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="Town / City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={user.address && user.address.city || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Postcode / ZIP"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              value={user.address && user.address.postcode || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              autoComplete="phone"
              variant="standard"
              value={user.phone || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email address"
              fullWidth
              autoComplete="email"
              variant="standard"
              value={user.email || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" onChange={handleCheckboxChange} />}
              label="Ship to a different address?"
            />
          </Grid>

          {shipToDifferentAddress && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Shipping Address
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="shippingAddress1"
                  name="shippingAddress1"
                  label="Street address"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(e) => setShippingAddress1(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="shippingAddress2"
                  name="shippingAddress2"
                  label="Apartment, suite, etc. (optional)"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  onChange={(e) => setShippingAddress2(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="shippingCity"
                  name="shippingCity"
                  label="Town / City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  onChange={(e) => setShippingCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="shippingZip"
                  name="shippingZip"
                  label="Postcode / ZIP"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                  onChange={(e) => setShippingPostcode(e.target.value)}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <TextField
              id="orderNotes"
              name="orderNotes"
              label="Order notes (optional)"
              fullWidth
              multiline
              rows={4}
              variant="standard"
            />
          </Grid>
        </Grid>

        {!properlyFilled && <Typography color='red'>Fill all the required fields.</Typography>}
        
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
            Place order
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
