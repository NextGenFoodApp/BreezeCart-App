import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import AdminHeader from "./components/AdminHeader";
import StatCard from "./components/StatCard";
import SalesChart from "./components/SalesChart";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    shops: 0,
    products: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, shopsRes, productsRes] = await Promise.all([
          axios.get("http://localhost:3030/users"),
          axios.get("http://localhost:3030/shops"),
          axios.get("http://localhost:3030/products"),
        ]);

        setStats({
          users: usersRes.data.length,
          shops: shopsRes.data.length,
          products: productsRes.data.length,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <AdminHeader />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <StatCard title="Total Users" value={stats.users} color="#4caf50" />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard title="Total Shops" value={stats.shops} color="#ff9800" />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              title="Total Products"
              value={stats.products}
              color="#f44336"
            />
          </Grid>
        </Grid>

        <Box mt={4}>
          <SalesChart />
        </Box>

        <Box mt={4}>
          <Paper sx={{ p: 3 }}>
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
    </>
  );
};

export default AdminDashboard;
