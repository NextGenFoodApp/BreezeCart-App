import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';

const CartPage = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log(parsedUser);

        if (parsedUser.user_id) {
          try {
            const response = await axios.get(`http://localhost:3030/users/${parsedUser.user_id}`);
            setCart(response.data.cart);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        } else {
          console.error('No user ID found');
        }
      } else {
        console.error('No user found in localStorage');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
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

    if (cart.length > 0) {
      fetchCartDetails();
    }
  }, [cart]);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleAddToBulk = () => {
    // Implement functionality to add cart to bulk
    console.log('Cart added to bulk');
  };

  const calculateTotal = () => {
    return cartDetails.reduce((total, item) => total + item.total_price, 0);
  };

  return (
    <Grid container spacing={3} style={{ padding: '20px', justifyContent: 'center' }}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Product Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Variation</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="right">Unit Price</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="right">Quantity</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="right">Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartDetails.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell align="right">${item.unit_price.toFixed(2)}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">${item.total_price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={8} style={{ textAlign: 'right', marginTop: '20px' }}>
        <Typography variant="h6">Total Cart Value: ${calculateTotal().toFixed(2)}</Typography>
        <Button variant="contained" color="primary" onClick={handleCheckout} style={{ margin: '10px' }}>
          Checkout
        </Button>
        <Button variant="contained" color="secondary" onClick={handleAddToBulk}>
          Add Cart to My Bulk
        </Button>
      </Grid>
    </Grid>
  );
};

export default CartPage;
