import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import ShopInfo from "../components/ShopInfo";
import ShopProducts from "../components/ShopProducts";

const UserDashboard = () => {
  return (
    <>
      <ShopInfo />
      <ShopProducts />
    </>
  );
};

export default UserDashboard;
