import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const ShopProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedShop = localStorage.getItem("shop");
    const parsedShop = JSON.parse(storedShop);
    const id = parsedShop.shop_id;

    axios
      .get(`http://localhost:3030/products/s/${id}`)
      .then((response) => {
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 6, fontFamily: "Roboto, sans-serif" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 4,
          color: "#1976d2",
        }}
      >
        Shop Products
      </Typography>

      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <TextField
          label="Search Products"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: "60%",
            maxWidth: 500,
            borderRadius: "12px",
            backgroundColor: "#f5f5f5",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "& fieldset": {
                borderColor: "#1976d2",
              },
              "&:hover fieldset": {
                borderColor: "#115293",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0d47a1",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredProducts.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={4}
                sx={{
                  transition: "transform 0.3s ease",
                  borderRadius: 3,
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.image}
                  alt={product.product_name}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {product.product_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    $ {product.items[0].price}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 2 }}
                    onClick={() =>
                      (window.location.href = `http://localhost:3000/product-details/${product.product_id}`)
                    }
                  >
                    View Product
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ShopProducts;
