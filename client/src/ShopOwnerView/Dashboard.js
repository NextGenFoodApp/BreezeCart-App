import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import ShopInfo from "../components/ShopInfo";
import ShopProducts from "../components/ShopProducts";
import ShopOrdersTabs from "../AdminView/components/ShopOrdersTabs";

const UserDashboard = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f0f4f8", // Soft calm blue-gray tone
        minHeight: "100vh",
        paddingY: 4,
      }}
    >
      <ShopInfo />
      <ShopOrdersTabs />
      <ShopProducts />
    </Box>
  );
};

export default UserDashboard;
