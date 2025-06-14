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
} from "@mui/material";

const ShopProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const storedShop = localStorage.getItem("shop");
    const parsedShop = JSON.parse(storedShop);
    const id = parsedShop.shop_id;

    // Fetch products of the shop
    axios
      .get(`http://localhost:3030/products/s/${id}`)
      .then((response) => {
        setProducts(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <Typography
        variant="h4"
        align="center"
        style={{ alignTop: 50, marginTop: 50 }}
      >
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                alt={product.product_name}
                image={product.image}
                title={product.product_name}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    window.location.href = `http://localhost:3000/products/${product.product_id}`;
                  }}
                >
                  View Product
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShopProducts;
