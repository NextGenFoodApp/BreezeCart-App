import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_name: "",
    category_id: "",
    shop_id: "",
    attribute: "",
  });

  const [items, setItems] = useState([
    { item_id: "", price: "", unit: "", image: "" },
  ]);

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleImageUpload = async (index, file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post(
      "http://localhost:3030/products/upload-item-image",
      formData
    );
    const newItems = [...items];
    newItems[index].image = res.data.url;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { item_id: "", price: "", unit: "", image: "" }]);
  };

  const handleSubmit = async () => {
    const payload = {
      ...product,
      price: items[0].price,
      items: items,
      image: items[0].image, // First item's image as product image
    };

    await axios.post("http://localhost:3030/products/", {
      ...payload,
      items: JSON.stringify(payload.items),
    });

    alert("Product added!");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "900px",
          p: 4,
          boxShadow: 4,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#1976d2", // MUI primary color or customize
            letterSpacing: "0.5px",
            textAlign: "center",
            mb: 3,
          }}
        >
          Add Product
        </Typography>
        <Grid container spacing={2} mt={1}>
          {["product_name", "category_id", "shop_id", "attribute"].map(
            (field) => (
              <Grid item xs={12} md={6} key={field}>
                <TextField
                  fullWidth
                  label={field.replace("_", " ").toUpperCase()}
                  name={field}
                  value={product[field]}
                  onChange={handleProductChange}
                  InputLabelProps={{
                    sx: { fontSize: "0.8rem" }, // 👈 smaller label font size
                  }}
                />
              </Grid>
            )
          )}

          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#333",
                mt: 3,
                mb: 1,
                borderBottom: "2px solid #1976d2", // underline effect
                display: "inline-block",
              }}
            >
              Items
            </Typography>
          </Grid>

          {items.map((item, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Item ID"
                  value={item.item_id}
                  onChange={(e) =>
                    handleItemChange(index, "item_id", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Price"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Unit"
                  value={item.unit}
                  onChange={(e) =>
                    handleItemChange(index, "unit", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  startIcon={<UploadFileIcon />} // <-- Add icon here
                >
                  Upload Image
                  <input
                    hidden
                    type="file"
                    onChange={(e) =>
                      handleImageUpload(index, e.target.files[0])
                    }
                  />
                </Button>
                {item.image && (
                  <Typography
                    variant="caption"
                    sx={{ color: "green", mt: 1, display: "block" }}
                  >
                    Image uploaded
                  </Typography>
                )}
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button startIcon={<AddIcon />} onClick={addItem}>
              Add Another Item
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Product
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default AddProduct;
