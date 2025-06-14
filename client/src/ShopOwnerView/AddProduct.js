import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_name: "",
    category_id: "",
    shop_id: "",
    price: "",
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
      items: items,
      image: items[0].image, // Assuming the first item's image is the product image
    };

    await axios.post("http://localhost:3030/products/", {
      ...payload,
      items: JSON.stringify(payload.items),
    });

    alert("Product added!");
  };

  return (
    <Card sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5">Add Product</Typography>
      <Grid container spacing={2} mt={2}>
        {["product_name", "category_id", "shop_id", "price", "attribute"].map(
          (field) => (
            <Grid item xs={12} md={6} key={field}>
              <TextField
                fullWidth
                label={field}
                name={field}
                value={product[field]}
                onChange={handleProductChange}
              />
            </Grid>
          )
        )}

        <Grid item xs={12}>
          <Typography variant="h6">Items</Typography>
        </Grid>

        {items.map((item, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Item ID"
                value={item.item_id}
                onChange={(e) =>
                  handleItemChange(index, "item_id", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Price"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, "price", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Unit"
                value={item.unit}
                onChange={(e) =>
                  handleItemChange(index, "unit", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" component="label" fullWidth>
                Upload Image
                <input
                  hidden
                  type="file"
                  onChange={(e) => handleImageUpload(index, e.target.files[0])}
                />
              </Button>
              {item.image && (
                <Typography variant="caption" color="green">
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
  );
};

export default AddProduct;
