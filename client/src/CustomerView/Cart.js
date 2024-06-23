import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TextField, Box } from '@mui/material';
import { Delete, Check } from '@mui/icons-material';
import axios from 'axios';

const CartPage = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const [quantityChanges, setQuantityChanges] = useState({});
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      console.log(localStorage);
      console.log(localStorage.getItem('user'));
      console.log(storedUser);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('Parsed user:', parsedUser);

        if (parsedUser && parsedUser.user_id) {
          try {
            const response = await axios.get(`http://localhost:3030/users/${parsedUser.user_id}`);
            setCart(response.data.cart);
            console.log('Cart data:', response.data.cart);
          } catch (error) {
            console.error('Error fetching user data from API:', error);
          }
        } else {
          console.error('No user ID found in the parsed user object');
        }
      } else {
        console.error('No user found in localStorage');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // The empty array ensures this runs only once when the component mounts

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

  const handleQuantityChange = (index, value) => {
    setQuantityChanges({
      ...quantityChanges,
      [index]: value,
    });
  };

  const handleConfirmChange = async(index) => {
    const newCartDetails = [...cartDetails];
    newCartDetails[index].quantity = quantityChanges[index] ? quantityChanges[index] : newCartDetails[index].quantity;
    newCartDetails[index].total_price = newCartDetails[index].unit_price * newCartDetails[index].quantity;
    setCartDetails(newCartDetails);
    await axios.post('http://localhost:3030/users/update-cart-item-quantity',
      {
        userId: user.user_id,
        updateItemIndex: index,
        newQuantity: quantityChanges[index] 
      }
    );
    setQuantityChanges({
      ...quantityChanges,
      [index]: undefined,
    });
  };

  const handleDelete = async(index) => {
    const newCartDetails = cartDetails.filter((_, i) => i !== index);
    setCartDetails(newCartDetails);
    await axios.post('http://localhost:3030/users/delete-item-from-cart',
      {
        userId: user.user_id,
        deleteItemIndex: index
      }
    );
    fetchUserData();
    fetchCartDetails();
  };

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
                <TableCell style={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartDetails.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell align="right">${item.unit_price.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      value={quantityChanges[index] !== undefined ? quantityChanges[index] : item.quantity}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                      inputProps={{ min: 1 }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">${item.total_price.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleConfirmChange(index)}>
                      <Check style={{ color: 'green' }} />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(index)}>
                      <Delete style={{ color: 'red' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {cartDetails.length === 0 && (
            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
              <Typography variant='h6' align='center'>Cart is empty.</Typography>
              <Button variant='contained' color='primary' href='/login'>Login</Button>
            </Box>
        )}
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
