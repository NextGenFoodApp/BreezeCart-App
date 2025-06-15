import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
  InputBase,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as AddressIcon,
  Star as StarIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const ShopPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [shopDetails, setShopDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shopResponse, productsResponse] = await Promise.all([
          axios.get(`http://localhost:3030/shops/${id}`),
          axios.get(`http://localhost:3030/products/s/${id}`),
        ]);
        setShopDetails(shopResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left Side: Shop Details */}
      <Box
        sx={{
          width: "25%",
          height: "100vh",
          overflowY: "auto",
          p: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          color: "white",
        }}
      >
        {shopDetails && (
          <>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <CardMedia
                component="img"
                alt={shopDetails.name}
                image={shopDetails.logo}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  objectFit: "contain",
                  border: `3px solid white`,
                  backgroundColor: "white",
                }}
              />
            </Box>

            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
            >
              {shopDetails.shop_name}
            </Typography>

            <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.3)" }} />

            <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <AddressIcon sx={{ mr: 1 }} />
              <Typography variant="body1">{shopDetails.address}</Typography>
            </Box>

            <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body1">{shopDetails.phone_no}</Typography>
            </Box>

            <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body1">{shopDetails.email}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 3,
              }}
            >
              <Chip
                icon={<StarIcon />}
                label="4.8 Rating"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "1px solid white",
                }}
              />
            </Box>
          </>
        )}
      </Box>

      {/* Right Side: Products */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 3, color: theme.palette.primary.main }}
        >
          Our Products
        </Typography>

        {/* Search Box */}
        <Paper
          component="form"
          sx={{
            p: "2px 8px",
            display: "flex",
            alignItems: "center",
            width: isMobile ? "100%" : 400,
            mb: 4,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Products"
            inputProps={{ "aria-label": "search products" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Paper>

        <Grid container spacing={3}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.product_id}>
                <Card
                  onClick={() => handleProductClick(product.product_id)}
                  onMouseEnter={() => setHoveredProduct(product.product_id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    backgroundColor: "#fce4ec",
                    border: `1px solid ${theme.palette.divider}`,
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={product.product_name}
                    image={product.image}
                    title={product.product_name}
                    sx={{
                      height: 200,
                      objectFit: "contain",
                      backgroundColor: theme.palette.grey[100],
                      transition: "transform 0.3s ease",
                      transform:
                        hoveredProduct === product.product_id
                          ? "scale(1.05)"
                          : "scale(1)",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {product.product_name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ mt: 2, ml: 1 }}>
              No products found.
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ShopPage;
