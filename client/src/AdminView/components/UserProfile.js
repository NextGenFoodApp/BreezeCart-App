import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Container,
  Grid,
} from "@mui/material";

const UserProfile = () => {
  const { id } = useParams(); // get :id from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/users/${id}`);
        setUser(res.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {user.name}
        </Typography>
        <Typography color="text.secondary">{user.email}</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Phone: {user.phone}
        </Typography>

        <Chip
          label={user.is_admin ? "Admin" : "User"}
          color={user.is_admin ? "success" : "default"}
          sx={{ mb: 2 }}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Address</Typography>
        <Typography>
          {user.address.address_line_1}, {user.address.address_line_2}
        </Typography>
        <Typography>
          {user.address.city}, {user.address.postcode}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Current Bulk IDs
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {user.current_bulk_id.map((id, index) => (
            <Chip key={index} label={`#${id}`} color="primary" />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Bulk History</Typography>
        {user.bulk_history.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No history available.
          </Typography>
        ) : (
          user.bulk_history.map((h, idx) => (
            <Typography key={idx} variant="body2">
              {h}
            </Typography>
          ))
        )}

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Created At:
            </Typography>
            <Typography>
              {new Date(user.createdAt).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Last Updated:
            </Typography>
            <Typography>
              {new Date(user.updatedAt).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
