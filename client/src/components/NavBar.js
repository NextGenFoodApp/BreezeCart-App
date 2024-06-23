import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  // Parse the 'user' item from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if 'user' item exists in localStorage
  const isUserLoggedIn = user !== null;

  // Check if 'user' item exists and if it has 'is_admin' attribute
  // const isAdmin = user && user.is_admin;

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove 'user' item from localStorage
    // You may add additional logout logic here, such as redirecting to the home page
  };


  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          BreezeCart
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {/* Conditionally render the login/register button */}
        {isUserLoggedIn ? 
          (
            <Button color="inherit" component={Link} to="/customerview/dashboard">
              Dashboard
            </Button>
          )
        :(
          <Button color="inherit" component={Link} to="/login">
            Login 
          </Button>
        )
        }
        {isUserLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ):(
          <Button color="inherit" component={Link} to="/register">
            Register 
          </Button>
        )}
        <Button color="inherit" component={Link} to="/cart">
          Cart
        </Button>
        <Button color="inherit" component={Link} to="/bulks">
          Bulks
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
