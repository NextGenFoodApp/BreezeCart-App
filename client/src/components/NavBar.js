import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  // Parse the 'user' item from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const shop = JSON.parse(localStorage.getItem('shop'));

  // Check if 'user' item exists in localStorage
  const isUserLoggedIn = user !== null;
  const isShopLoggedIn = shop !== null;

  // Check if 'user' item exists and if it has 'is_admin' attribute
  // const isAdmin = user && user.is_admin;

  // Function to handle logout
  const handleLogout = () => {
    if(isUserLoggedIn){
      localStorage.removeItem('user'); 
      localStorage.setItem('bulk_id',0); 
    }else if(isShopLoggedIn){
      localStorage.removeItem('shop'); 
    }
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
        {isShopLoggedIn ? 
          (
            <Button color="inherit" component={Link} to="/shopownerview/dashboard">
              Dashboard
            </Button>
          )
        :(
          <></>
        )
        }
        {(isUserLoggedIn || isShopLoggedIn) ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ):(
          <Button color="inherit" component={Link} to="/register">
            Register 
          </Button>
        )}
        {isUserLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/cart">
              Cart
            </Button>
            <Button color="inherit" component={Link} to="/bulks">
              Bulks
            </Button>
            <Button color="inherit" component={Link} to="/checkout">
              Checkout
            </Button>
          </>
        ) : 
        (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
