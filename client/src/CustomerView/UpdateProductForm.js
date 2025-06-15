import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/products/${id}`);
        setProduct(res.data);
        setItems(res.data.items || []);
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleImageUpload = async (index, file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(
        "http://localhost:3030/products/upload-item-image",
        formData
      );
      const newItems = [...items];
      newItems[index].image = res.data.url;
      setItems(newItems);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("❌ Failed to upload image.");
    }
  };

  const addNewItem = () => {
    setItems([
      ...items,
      {
        image: "",
        price: 0,
        unit: "",
      },
    ]);
  };

  const removeItem = (indexToRemove) => {
    const updated = items.filter((_, index) => index !== indexToRemove);
    setItems(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...product,
        items,
        image: items[0]?.image || product.image,
        price: items[0]?.price || product.price,
      };

      const res = await axios.put(
        `http://localhost:3030/products/${product.product_id}`,
        {
          ...payload,
          items: JSON.stringify(payload.items),
        }
      );

      if (res.status === 200) {
        alert("✅ Product updated successfully!");
        navigate(`/product-details/${product.product_id}`);
      } else {
        alert("⚠️ Failed to update product.");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      alert("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Update Product Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              name="product_name"
              fullWidth
              value={product.product_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Category ID"
              name="category_id"
              fullWidth
              type="number"
              value={product.category_id}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Shop ID"
              name="shop_id"
              fullWidth
              type="number"
              value={product.shop_id}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Attribute"
              name="attribute"
              fullWidth
              value={product.attribute}
              onChange={handleChange}
            />
          </Grid>

          {/* Items */}
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  startIcon={<UploadFileIcon />}
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
                  <>
                    <Typography
                      variant="caption"
                      sx={{ color: "green", mt: 1, display: "block" }}
                    >
                      Image uploaded
                    </Typography>
                    <img
                      src={item.image}
                      alt="Preview"
                      style={{
                        width: "100%",
                        maxHeight: "120px",
                        objectFit: "cover",
                        marginTop: "5px",
                        borderRadius: "8px",
                      }}
                    />
                  </>
                )}
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={9} md={3}>
                <TextField
                  label="Unit"
                  fullWidth
                  value={item.unit}
                  onChange={(e) =>
                    handleItemChange(index, "unit", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={3} md={2}>
                <IconButton
                  color="error"
                  onClick={() => removeItem(index)}
                  sx={{ mt: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}

          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              fullWidth
              onClick={addNewItem}
              sx={{ mt: 2 }}
            >
              Add New Item
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UpdateProductForm;
