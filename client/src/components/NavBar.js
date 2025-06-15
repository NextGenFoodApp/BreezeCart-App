import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const shop = JSON.parse(localStorage.getItem("shop"));

  const isUserLoggedIn = user !== null;
  const isShopLoggedIn = shop !== null;

  const handleLogout = () => {
    if (isUserLoggedIn) {
      localStorage.removeItem("user");
      localStorage.setItem("bulk_id", 0);
    } else if (isShopLoggedIn) {
      localStorage.removeItem("shop");
    }
    window.location.href = "/";
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
        boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ShoppingCartIcon sx={{ marginRight: 1, fontSize: "2rem" }} />
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: "1px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            BreezeCart
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Home
          </Button>

          {isUserLoggedIn || isShopLoggedIn ? null : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              startIcon={<LoginIcon />}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Login
            </Button>
          )}

          {isUserLoggedIn && (
            <Button
              color="inherit"
              component={Link}
              to={
                user.is_admin
                  ? "/adminview/dashboard"
                  : "/customerview/dashboard"
              }
              startIcon={<DashboardIcon />}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Dashboard
            </Button>
          )}

          {isShopLoggedIn && (
            <Button
              color="inherit"
              component={Link}
              to="/shopownerview/dashboard"
              startIcon={<DashboardIcon />}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Dashboard
            </Button>
          )}

          {isUserLoggedIn || isShopLoggedIn ? (
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/register"
              startIcon={<HowToRegIcon />}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Register
            </Button>
          )}

          {isUserLoggedIn && !user.is_admin && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/cart"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Cart
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/bulks"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Bulks
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/checkout"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Checkout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
