import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminHeader from "./components/AdminHeader";
import StatCard from "./components/StatCard";
import SalesChart from "./components/SalesChart";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    shops: 0,
    products: 0,
    categories: 0,
  });

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, shopsRes, productsRes, categoriesRes] =
          await Promise.all([
            axios.get("http://localhost:3030/users"),
            axios.get("http://localhost:3030/shops"),
            axios.get("http://localhost:3030/products"),
            axios.get("http://localhost:3030/categories"), // make sure this endpoint exists
          ]);

        console.log("Users Data:", usersRes.data);
        console.log("Shops Data:", shopsRes.data);
        console.log("Products Data:", productsRes.data);
        console.log("Categories Data:", categoriesRes.data);

        setStats({
          users: usersRes.data.length,
          shops: shopsRes.data.length,
          products: productsRes.data.length,
          categories: categoriesRes.data.length,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleOpenCategoryModal = () => setOpenCategoryModal(true);
  const handleCloseCategoryModal = () => {
    setOpenCategoryModal(false);
    setCategoryName("");
    setDescription("");
  };

  const handleAddShop = () => {
    // navigate to shop creation page
    window.location.href = "/adminview/add-shop";
  };

  // const handleAddCategory = () => {
  //   // navigate to category creation page
  //   window.location.href = "/add-category";
  // };

  const handleSubmitCategory = async () => {
    console.log("Comes to submit category", categoryName, description);
    try {
      await axios.post("http://localhost:3030/categories", {
        category_name: categoryName,
        description: description,
      });
      console.log("Category added successfully");
      alert("Category added successfully");
      handleCloseCategoryModal();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category");
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f4f6f8",
          pt: 6,
          pb: 6,
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 4, color: "#333" }}
          >
            Admin Dashboard
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Users"
                value={stats.users}
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Shops"
                value={stats.shops}
                color="#ff9800"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Products"
                value={stats.products}
                color="#f44336"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Categories"
                value={stats.categories}
                color="#2196f3"
              />
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
              mt: 4,
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenCategoryModal}
            >
              Add Category
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={handleAddShop}
            >
              Add Shop
            </Button>
          </Box>
          <Dialog
            open={openCategoryModal}
            onClose={handleCloseCategoryModal}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent dividers>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  margin="normal"
                  fullWidth
                  label="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={3}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCategoryModal}>Cancel</Button>
              <Button
                onClick={handleSubmitCategory}
                variant="contained"
                color="primary"
              >
                Add Category
              </Button>
            </DialogActions>
          </Dialog>

          {/* Chart */}
          <Box mt={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sales Overview
              </Typography>
              <SalesChart />
            </Paper>
          </Box>

          {/* Recent Activities */}
          <Box mt={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <Typography variant="body2" color="textSecondary">
                - Shop #12 added a new product
                <br />
                - User "john.doe@gmail.com" registered
                <br />
                - Product #103 deleted
                <br />
                (Integrate with actual activity data as needed)
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AdminDashboard;
