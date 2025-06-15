import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StatCard = ({ title, value, color, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        borderLeft: `5px solid ${color}`,
        boxShadow: 3,
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
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
};

export default StatCard;
