import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";

const AddShopPage = () => {
  const [formData, setFormData] = useState({
    shop_name: "",
    password: "",
    shop_owner: "",
    address: "",
    postal_code: "",
    phone_no: "",
    email: "",
    bank_acc_number: "",
    bank_acc_holder: "",
    bank: "",
    bank_branch: "",
    logo: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post(
      "http://localhost:3030/products/upload-item-image",
      formData
    );
    console.log("Image uploaded successfully:", response.data.url);
    setFormData((prev) => ({
      ...prev,
      logo: response.data.url,
    }));
  };

  // const handleImageUload = async () => {
  //   if (!imageFile) return;

  //   const formData = new FormData();
  //   formData.append("image", imageFile);

  //   console.log("Uploading image:", imageFile.name);

  //   try {
  //     setUploading(true);
  //     const response = await axios.post(
  //       "http://localhost:3030/products/upload-item-image",
  //       formData
  //     );

  //     setUploading(false);
  //   } catch (error) {
  //     console.error("Image upload failed", error);
  //     alert("Failed to upload image.");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3030/shops", formData);
      alert("Shop added successfully!");
      // Optionally reset form or redirect
    } catch (error) {
      console.error("Error creating shop:", error);
      alert("Failed to create shop.");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Add New Shop
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {/* Shop Info */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Shop Name"
                name="shop_name"
                value={formData.shop_name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Owner Info */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Shop Owner"
                name="shop_owner"
                value={formData.shop_owner}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
              />
            </Grid>

            {/* Bank Info */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Account Number"
                name="bank_acc_number"
                value={formData.bank_acc_number}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Account Holder"
                name="bank_acc_holder"
                value={formData.bank_acc_holder}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank"
                name="bank"
                value={formData.bank}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Branch"
                name="bank_branch"
                value={formData.bank_branch}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={<UploadFileIcon />} // <-- Add icon here
              >
                Upload shop Logo
                <input
                  hidden
                  type="file"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
              </Button>
              {formData.logo && (
                <Typography
                  variant="caption"
                  sx={{ color: "green", mt: 1, display: "block" }}
                >
                  Image uploaded
                </Typography>
              )}
              {formData.logo && (
                <Box mt={2}>
                  <img
                    src={formData.logo}
                    alt="Logo Preview"
                    style={{ maxWidth: "200px", height: "auto" }}
                  />
                </Box>
              )}
            </Grid>

            {/* Submit */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                type="submit"
                sx={{ mt: 2 }}
              >
                Add Shop
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddShopPage;
