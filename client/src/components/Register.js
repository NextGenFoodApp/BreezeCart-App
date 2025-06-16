import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Person,
  Lock,
  Home,
  Phone,
  LocationCity,
  LocalPostOffice,
  Apartment,
} from "@mui/icons-material";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    address: {
      address_line_1: "",
      address_line_2: "",
      city: "",
      postcode: "",
    },
    phone_no: "",
    email: "",
    is_admin: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.phone_no) newErrors.phone_no = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone_no))
      newErrors.phone_no = "Invalid phone number";
    if (!formData.address.address_line_1)
      newErrors.address_line_1 = "Address line 1 required";
    if (!formData.address.city) newErrors.city = "City is required";
    if (!formData.address.postcode) newErrors.postcode = "Postcode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:3030/users", formData);
      alert("User registered successfully!");
      // Reset
      setFormData({
        name: "",
        password: "",
        confirmPassword: "",
        address: {
          address_line_1: "",
          address_line_2: "",
          city: "",
          postcode: "",
        },
        phone_no: "",
        email: "",
        is_admin: false,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register user.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: 6,
          borderRadius: 4,
          background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Create Your Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                error={!!errors.phone_no}
                helperText={errors.phone_no}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Address Line 1 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 1"
                name="address.address_line_1"
                value={formData.address.address_line_1}
                onChange={handleChange}
                error={!!errors.address_line_1}
                helperText={errors.address_line_1}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Address Line 2 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 2"
                name="address.address_line_2"
                value={formData.address.address_line_2}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Apartment />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* City */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCity />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Postcode */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Postcode"
                name="address.postcode"
                value={formData.address.postcode}
                onChange={handleChange}
                error={!!errors.postcode}
                helperText={errors.postcode}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPostOffice />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Submit */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  mt: 2,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#115293",
                    transform: "scale(1.02)",
                    boxShadow: "0 0 10px rgba(25, 118, 210, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Register Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
