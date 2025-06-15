import React, { useState } from 'react';
import { TextField, Button, Container, Typography, FormControl, InputLabel, Select, MenuItem, Box, Paper, Avatar, InputAdornment, CircularProgress } from '@mui/material';
import {
    Person as PersonIcon,
    Store as StoreIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    VpnKey as ShopIdIcon
} from '@mui/icons-material';
import axios from 'axios';

const Login = () => {
    const [loginType, setLoginType] = useState('customer');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shopId, setShopId] = useState('');
    const [shopPassword, setShopPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLoginTypeChange = (event) => {
        setLoginType(event.target.value);
        setError('');
    };

    const handleCustomerLogin = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:3030/users/login', { email, password });
            localStorage.setItem('user', JSON.stringify(response.data));
            const user = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('bulk_id', user.current_bulk_id[0]);
            window.location.href = '/customerview/dashboard';
        } catch (error) {
            console.error('Error logging in as customer:', error);
            setError('Invalid email or password');
            setIsLoading(false);
        }
    };

    const handleShopOwnerLogin = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:3030/shops/login', { shop_id: shopId, password: shopPassword });
            localStorage.setItem('shop', JSON.stringify(response.data));
            window.location.href = '/shopownerview/dashboard';
        } catch (error) {
            console.error('Error logging in as shop owner:', error);
            setError('Invalid shop ID or password');
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{
                        m: 1,
                        bgcolor: 'secondary.main',
                        width: 60,
                        height: 60
                    }}>
                        {loginType === 'customer' ? (
                            <PersonIcon fontSize="large" />
                        ) : (
                            <StoreIcon fontSize="large" />
                        )}
                    </Avatar>
                    <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
                        {loginType === 'customer' ? 'Customer Login' : 'Shop Owner Login'}
                    </Typography>
                </Box>

                <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
                    <InputLabel
                        sx={{
                            backgroundColor: 'background.paper',
                            px: 1,
                            zIndex: 1,
                            '&.Mui-focused': {
                                color: 'primary.main',
                            }
                        }}
                    >
                        Login Type
                    </InputLabel>
                    <Select
                        value={loginType}
                        onChange={handleLoginTypeChange}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'divider',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.light',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                                borderWidth: 2,
                            }
                        }}
                    >
                        <MenuItem value="customer">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PersonIcon sx={{ mr: 1 }} /> Customer
                            </Box>
                        </MenuItem>
                        <MenuItem value="shopOwner">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <StoreIcon sx={{ mr: 1 }} /> Shop Owner
                            </Box>
                        </MenuItem>
                    </Select>
                </FormControl>

                {error && (
                    <Typography color="error" align="center" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

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
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleCustomerLogin}
                            disabled={isLoading}
                            size="large"
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 3
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Login as Customer'}
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
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ShopIdIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            value={shopPassword}
                            onChange={(e) => setShopPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleShopOwnerLogin}
                            disabled={isLoading}
                            size="large"
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 3
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Login as Shop Owner'}
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default Login;