import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const AdminHeader = () => (
  <AppBar position="static" sx={{ mb: 2 }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Admin Dashboard
      </Typography>
    </Toolbar>
  </AppBar>
);

export default AdminHeader;
