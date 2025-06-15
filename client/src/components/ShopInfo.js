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
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

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
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Card
            sx={{
              width: "100%",
              p: 2,
              boxShadow: 4,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              alt={`Shop ${shopId}`}
              image={shop.logo}
              sx={{
                width: "100%",
                maxHeight: 250,
                objectFit: "contain",
                borderRadius: 2,
                mb: 2,
              }}
            />
            <Link
              to={`/shop-owners/${shopId}`}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <Button
                variant="contained"
                startIcon={<VisibilityIcon />}
                fullWidth
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: "bold",
                }}
              >
                View Shop
              </Button>
            </Link>
          </Card>
        </Grid>

        {/* Right Side - Shop Details */}
        <Grid item xs={12} md={8}>
          <Card elevation={5} sx={{ borderRadius: 3 }}>
            <CardContent>
              {[
                { label: "Shop Name", key: "shopName" },
                { label: "Owner", key: "shopOwner" },
                { label: "Address", key: "address" },
                { label: "Postal Code", key: "postalCode" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "phone" },
              ].map(({ label, key }, index) => (
                <React.Fragment key={index}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 2 }}
                  >
                    <Grid item xs={4}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "#555" }}
                      >
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
                        />
                      ) : (
                        <Typography variant="body1">{shop[key]}</Typography>
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
                  {index !== 5 && <Divider sx={{ mb: 2 }} />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopInfo;
