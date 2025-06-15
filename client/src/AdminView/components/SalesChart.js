import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 800 },
  { name: "Mar", sales: 650 },
  { name: "Apr", sales: 900 },
  { name: "May", sales: 700 },
];

const SalesChart = () => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6" gutterBottom>
      Monthly Sales Overview
    </Typography>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#1976d2"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
);

export default SalesChart;
