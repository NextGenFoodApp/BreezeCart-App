import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";

import EditIcon from "@mui/icons-material/Edit";

const ShopInfo = () => {
  const [shopId, setShopId] = useState(0);
  const [shop, setShop] = useState({
    shopName: "",
    shopOwner: "",
    address: "",
    postalCode: 0,
    phone: "",
    email: "",
    logo: "",
  });
  const [editField, setEditField] = useState(null);

  useEffect(() => {
    const storedShop = localStorage.getItem("shop");
    const parsedShop = JSON.parse(storedShop);
    const shopId = parsedShop.shop_id;
    setShopId(shopId);
    axios
      .get(`http://localhost:3030/shops/${shopId}`)
      .then((response) => {
        const data = response.data;
        setShop({
          shopName: data.shop_name,
          shopOwner: data.shop_owner,
          address: data.address,
          postalCode: data.postal_code,
          email: data.email,
          phone: data.phone_no,
          logo: data.logo,
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the shop data!", error);
      });
  }, []);

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShop({ ...shop, [name]: value });
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
      phone: shop.phone,
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, fontFamily: "Roboto, sans-serif" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4, color: "#1976d2" }}
      >
        Shop Information
      </Typography>

      <Grid container spacing={4}>
        {/* Left Side - Shop Image */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Link to={`/shop-owners/${shopId}`} style={{ width: "100%" }}>
              <CardMedia
                component="img"
                alt={`Shop ${shopId}`}
                image={shop.logo}
                title={`Shop ${shopId}`}
                sx={{
                  width: "100%",
                  maxHeight: 250,
                  objectFit: "contain",
                  borderRadius: 2,
                  boxShadow: 3,
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />
            </Link>
          </Box>
        </Grid>

        {/* Right Side - Shop Details */}
        <Grid item xs={12} md={8}>
          <Card elevation={4}>
            <CardContent>
              {[
                { label: "Shop Name", key: "shopName" },
                { label: "Owner", key: "shopOwner" },
                { label: "Address", key: "address" },
                { label: "Postal Code", key: "postalCode" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "phone" },
              ].map(({ label, key }, index) => (
                <Grid
                  container
                  key={index}
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  <Grid item xs={4}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {label}:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {editField === key ? (
                      <TextField
                        fullWidth
                        variant="standard"
                        name={key}
                        value={shop[key]}
                        onChange={handleInputChange}
                        sx={{ fontSize: "1rem" }}
                      />
                    ) : (
                      <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                        {shop[key]}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={2}>
                    {editField === key ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleSaveClick}
                        sx={{ minWidth: "36px", px: 1 }}
                      >
                        ✔
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => handleEditClick(key)}
                        startIcon={<EditIcon />}
                        sx={{ textTransform: "none", px: 1 }}
                      >
                        Edit
                      </Button>
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
