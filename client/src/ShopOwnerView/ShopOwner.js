import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
} from "@mui/material";

const ShopOwnerPage = () => {
  const { id } = useParams();
  const [shopDetails, setShopDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchShopDetails();
    fetchShopProducts();
  }, [id]);

  const fetchShopDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3030/shops/${id}`);
      setShopDetails(res.data);
    } catch (error) {
      console.error("Error fetching shop details:", error);
    }
  };

  const fetchShopProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:3030/products/s/${id}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3030/products/${productId}`);
      fetchShopProducts(); // refresh
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Shop Details Section */}
      {shopDetails && (
        <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 3 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <CardMedia
                component="img"
                image={shopDetails.logo}
                alt={shopDetails.shop_name}
                sx={{
                  width: "100%",
                  maxHeight: 250,
                  objectFit: "contain",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {shopDetails.shop_name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {shopDetails.address}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Phone:</strong> {shopDetails.phone_no}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {shopDetails.email}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Products Section Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          Products
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddProduct}
          sx={{ textTransform: "none", px: 3, py: 1 }}
        >
          + Add New Product
        </Button>
      </Box>

      {/* Product List Grid */}
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
            <Card
              elevation={4}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.product_name}
                sx={{
                  height: 180,
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
                  {product.product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Price: Rs. {product.price}
                </Typography>
              </CardContent>
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                sx={{ pb: 2 }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() =>
                    navigate(`/product-details/${product.product_id}`)
                  }
                  sx={{ textTransform: "none" }}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => deleteProduct(product.product_id)}
                  sx={{ textTransform: "none" }}
                >
                  Remove
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShopOwnerPage;
