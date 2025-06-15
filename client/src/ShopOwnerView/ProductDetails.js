import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Link,
  Grid,
  Card,
  CardMedia,
  Button,
  TextField,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [user, setUser] = useState(null);
  const [shop, setShop] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRes = await axios.get(
          `http://localhost:3030/products/${id}`
        );
        setProduct(productRes.data);
        setSelectedItem(
          productRes.data.items.length === 1 ? productRes.data.items[0] : null
        );

        const categoryRes = await axios.get(
          `http://localhost:3030/categories/${productRes.data.category_id}`
        );
        setCategory(categoryRes.data);

        const shopRes = await axios.get(
          `http://localhost:3030/shops/${productRes.data.shop_id}`
        );
        setShop(shopRes.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (event) => setQuantity(event.target.value);
  const handleItemClick = (item) => setSelectedItem(item);

  const handleUpdateProduct = () => {
    window.location.href = `/update-product/${id}`;
  };

  return (
    <Grid
      container
      spacing={12}
      sx={{
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 1,
      }}
    >
      {product && (
        <>
          {/* Left Side - Image */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                borderRadius: 3,
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5", // optional calm background
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={selectedItem ? selectedItem.image : product.image}
                alt={product.product_name}
                sx={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </Paper>
          </Grid>

          {/* Right Side - Info */}
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <Link
                  href={`/categories/${product.category_id}`}
                  underline="hover"
                  color="primary"
                >
                  {category?.category_name}
                </Link>
              </Typography>

              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                {product.product_name}
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                From{" "}
                <Link
                  href={`/shops/${product.shop_id}`}
                  underline="hover"
                  color="secondary"
                >
                  {shop?.shop_name}
                </Link>
              </Typography>

              {product.items.length > 1 && (
                <>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {product.attribute}:
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    {product.items.map((item) => (
                      <Grid item key={item.item_id}>
                        <Card
                          onClick={() => handleItemClick(item)}
                          sx={{
                            border:
                              selectedItem?.item_id === item.item_id
                                ? "2px solid #1976d2"
                                : "1px solid #ccc",
                            borderRadius: 2,
                            cursor: "pointer",
                            width: 60,
                            height: 60,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "&:hover": { borderColor: "primary.main" },
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={item.image}
                            alt={item.unit}
                            sx={{ width: 50, height: 50, objectFit: "cover" }}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedItem
                  ? `${selectedItem.unit}, Price: $${selectedItem.price}`
                  : product.items.length === 1
                  ? `${product.items[0].unit}, Price: $${product.items[0].price}`
                  : "Select a variation to see price"}
              </Typography>

              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1 }}
                fullWidth
                sx={{ mb: 3 }}
              />

              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleUpdateProduct}
              >
                Update Product
              </Button>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ProductDetailsPage;
