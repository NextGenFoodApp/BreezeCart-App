import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';

const CartPage = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

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


  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleAddToBulk = () => {
    // Implement functionality to add cart to bulk
    console.log('Cart added to bulk');
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + (product.unit_price * product.quantity), 0);
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
              {cart.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.variation ? product.variation : '-'}</TableCell>
                  <TableCell align="right">${product.unit_price}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">${(product.unit_price * product.quantity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'right', marginTop: '20px' }}>
        <Typography variant="h6">Total Cart Value: ${calculateTotal()}</Typography>
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
