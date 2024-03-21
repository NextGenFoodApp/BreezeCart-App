import React, { useState } from 'react';
import { TextField, Button, Container, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [loginType, setLoginType] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shopId, setShopId] = useState('');
  const [shopPassword, setShopPassword] = useState('');

  const handleLoginTypeChange = (event) => {
    setLoginType(event.target.value);
  };

  const handleCustomerLogin = async () => {
    try {
        const response = await axios.post('http://localhost:3030/users/login', { email, password });
        console.log("Customer Login: ", email, password);
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(localStorage.getItem('user'));
        window.location.href = '/customerview/dashboard';
    } catch (error) {
    console.error('Error logging in as customer:', error);
    }
  };

  const handleShopOwnerLogin = async () => {
    try {
        const response = await axios.post('http://localhost:3030/shops/login', { shopId, password: shopPassword });
        console.log("Shop Owner Login: ", shopId, shopPassword);
        localStorage.setItem('shop', JSON.stringify(response.data));
        console.log(localStorage.getItem('shop'));
        window.location.href = '/shopownerview/dashboard';
    } catch (error) {
    console.error('Error logging in as shop owner:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Login Type</InputLabel>
        <Select
          value={loginType}
          onChange={handleLoginTypeChange}
        >
          <MenuItem value="customer">Customer</MenuItem>
          <MenuItem value="shopOwner">Shop Owner</MenuItem>
        </Select>
      </FormControl>
      {loginType === 'customer' ? (
        <>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleCustomerLogin}>
            Login
          </Button>
        </>
      ) : (
        <>
          <TextField
            label="Shop ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={shopId}
            onChange={(e) => setShopId(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={shopPassword}
            onChange={(e) => setShopPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleShopOwnerLogin}>
            Login
          </Button>
        </>
      )}
    </Container>
  );
};

export default Login;
