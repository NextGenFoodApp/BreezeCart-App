import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const BulkProfile = () => {
  const { id } = useParams();
  const [bulk, setBulk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBulk = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/bulks/${id}`);
        setBulk(res.data);
      } catch (err) {
        setError("Failed to fetch bulk data.");
      } finally {
        setLoading(false);
      }
    };
    fetchBulk();
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
    <Card sx={{ maxWidth: 900, margin: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Bulk #{bulk.bulk_id} - {bulk.bulk_name || "Unnamed Bulk"}
        </Typography>

        <Chip
          label={bulk.status}
          color={bulk.status === "active" ? "success" : "default"}
          sx={{ mt: 1 }}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1">
          <strong>Frequency:</strong> {bulk.frequency}
        </Typography>
        <Typography variant="body1">
          <strong>Delivery Start Date:</strong>{" "}
          {new Date(bulk.delivery_starting_date).toLocaleDateString()}
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>User ID:</strong> {bulk.user_id}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Bulk Items
        </Typography>
        {bulk.items.length === 0 ? (
          <Typography>No items in this bulk.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Item ID</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bulk.items.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.product_id}</TableCell>
                  <TableCell>{item.item_id}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary">
          Created At: {new Date(bulk.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Updated At: {new Date(bulk.updatedAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BulkProfile;
