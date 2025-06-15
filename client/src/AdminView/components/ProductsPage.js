import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  IconButton,
  Divider,
  Container,
  Box,
  Grid,
  Avatar,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3030/products").then((res) => {
      console.log("Products data: ----------------- ", res.data[0]);
      setProducts(res.data);
    });
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3030/products/${productId}`);
        setProducts(products.filter((p) => p.product_id !== productId));
      } catch (error) {
        alert("Failed to delete the product.");
        console.error(error);
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", fontFamily: "'Roboto', sans-serif" }}
      >
        Products
      </Typography>

      <TextField
        label="Search by product name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <List sx={{ bgcolor: "#f9f9f9", borderRadius: 2, boxShadow: 2 }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <React.Fragment key={product.product_id}>
              <ListItem
                alignItems="flex-start"
                sx={{ px: 3, py: 2 }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      src={product.image}
                      alt={product.product_name}
                      sx={{ width: 56, height: 56 }}
                    />
                  </Grid>
                  <Grid item xs={10} sm container>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        {product.product_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: "'Roboto', sans-serif" }}
                      >
                        ID: {product.product_id} &nbsp;|&nbsp; Shop ID:{" "}
                        {product.shop_id}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: "'Roboto', sans-serif" }}
                      >
                        Attribute: {product.attribute}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ px: 2, py: 3, fontStyle: "italic", color: "text.secondary" }}
          >
            No matching products found.
          </Typography>
        )}
      </List>
    </Container>
  );
};

export default ProductsPage;
