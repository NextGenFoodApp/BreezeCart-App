import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StatCard = ({ title, value, color }) => (
  <Card sx={{ borderLeft: `5px solid ${color}`, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default StatCard;
