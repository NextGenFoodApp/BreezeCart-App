import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete, Check, Edit } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";

const Bulks = () => {
  const [user, setUser] = useState(null);
  const [currentBulks, setCurrentBulks] = useState([]);
  const [bulkHistory, setBulkHistory] = useState([]);
  const [selectedBulkId, setSelectedBulkId] = useState(
    localStorage.getItem("bulk_id")
  );
  const [selectedBulk, setSelectedBulk] = useState([]);
  const [selectedBulkDetails, setSelectedBulkDetails] = useState([]);
  const [quantityChanges, setQuantityChanges] = useState({});
  const [timesCounter, setTimesCounter] = useState(1);
  const [bulkMeta, setBulkMeta] = useState({
    name: "",
    frequency: "",
    delivery_starting_date: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser.user_id) {
          const response = await axios.get(
            `http://localhost:3030/users/${parsedUser.user_id}`
          );
          setCurrentBulks(response.data.current_bulk_id || []);
          setBulkHistory(response.data.bulk_history || []);
        }
      }
    } catch (error) {
      console.error("Error parsing or fetching user data:", error);
    }
  };

  const fetchBulk = async () => {
    try {
      if (!selectedBulkId) return;
      const response = await axios.get(
        `http://localhost:3030/bulks/${selectedBulkId}`
      );
      const items = response.data.items || [];
      setSelectedBulk(items);
      if (items.length === 0) setSelectedBulkDetails([]);
      setBulkMeta({
        name: response.data.name || "",
        frequency: response.data.frequency || "",
        delivery_starting_date:
          response.data.delivery_starting_date?.slice(0, 10) || "",
      });
    } catch (error) {
      console.error("Error fetching bulk:", error);
    }
  };

  const fetchBulkDetails = async () => {
    if (selectedBulk.length === 0) {
      setSelectedBulkDetails([]);
      return;
    }

    const bulkDetails = await Promise.all(
      selectedBulk.map(async (bulkItem) => {
        try {
          const productResponse = await axios.get(
            `http://localhost:3030/products/${bulkItem.product_id}`
          );
          const product = productResponse.data;
          const item = product.items.find(
            (item) => item.item_id === bulkItem.item_id
          );
          return {
            product_name: product.product_name,
            unit: item.unit,
            unit_price: item.price,
            quantity: bulkItem.quantity,
            total_price: item.price * bulkItem.quantity,
          };
        } catch (error) {
          console.error("Error fetching product data:", error);
          return null;
        }
      })
    );

    setSelectedBulkDetails(bulkDetails.filter((detail) => detail !== null));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setSelectedBulk([]);
    setSelectedBulkDetails([]);
    if (selectedBulkId) {
      localStorage.setItem("bulk_id", selectedBulkId);
      fetchBulk();
    }
  }, [selectedBulkId]);

  useEffect(() => {
    if (selectedBulk.length > 0) {
      fetchBulkDetails();
    }
  }, [selectedBulk]);

  const handleQuantityChange = (index, value) => {
    setQuantityChanges({
      ...quantityChanges,
      [index]: value,
    });
  };

  const handleTimesChange = (value) => {
    setTimesCounter(value);
  };

  const handleConfirmChange = async (index) => {
    const newSelectedBulkDetails = [...selectedBulkDetails];
    newSelectedBulkDetails[index].quantity =
      quantityChanges[index] ?? newSelectedBulkDetails[index].quantity;
    newSelectedBulkDetails[index].total_price =
      newSelectedBulkDetails[index].unit_price *
      newSelectedBulkDetails[index].quantity;
    setSelectedBulkDetails(newSelectedBulkDetails);
    await axios.post("http://localhost:3030/bulks/update-bulk-item-quantity", {
      bulkId: selectedBulkId,
      updateItemIndex: index,
      newQuantity: quantityChanges[index],
    });
    setQuantityChanges({
      ...quantityChanges,
      [index]: undefined,
    });
  };

  const handleDelete = async (index) => {
    const newSelectedBulkDetails = selectedBulkDetails.filter(
      (_, i) => i !== index
    );
    setSelectedBulkDetails(newSelectedBulkDetails);
    await axios.post("http://localhost:3030/bulks/delete-item-from-bulk", {
      bulkId: selectedBulkId,
      deleteItemIndex: index,
    });
    fetchUserData();
    fetchBulk();
  };

  const handlePayment = async () => {
    await fetchBulk();
    await fetchBulkDetails();

    const mergedArray = selectedBulk.map((item, index) => ({
      ...item,
      ...selectedBulkDetails[index],
    }));

    await axios.post(`http://localhost:3030/bulk-orders`, {
      userId: user.user_id,
      bulkId: selectedBulkId,
      timesCount: timesCounter,
      items: mergedArray,
      bulkValue: calculateTotal().toFixed(2),
      paidAmount: calculateTotal().toFixed(2) * timesCounter,
    });

    Swal.fire("Congrats", "Your payment is successful.", "success").then(() => {
      window.location.reload();
    });
  };

  const calculateTotal = () => {
    return selectedBulkDetails.reduce(
      (total, item) => total + item.total_price,
      0
    );
  };

  const handleBulkMetaChange = (e) => {
    setBulkMeta({ ...bulkMeta, [e.target.name]: e.target.value });
  };

  const handleBulkMetaSubmit = async () => {
    try {
      await axios.post("http://localhost:3030/bulks/update-bulk-meta", {
        bulkId: selectedBulkId,
        ...bulkMeta,
      });
      Swal.fire("Updated", "Bulk details updated successfully.", "success");
      setModalOpen(false);
    } catch (err) {
      Swal.fire("Error", "Failed to update bulk details.", "error");
      console.error(err);
    }
  };

  return (
    <div>
      <Box textAlign="center" mt={3}>
        <Typography variant="h4" fontWeight="bold">
          Bulks
        </Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        mt={2}
        gap={2}
      >
        {currentBulks.map((bulk_id) => (
          <Button
            key={bulk_id}
            variant={selectedBulkId === bulk_id ? "contained" : "outlined"}
            color="primary"
            onClick={() => setSelectedBulkId(bulk_id)}
            sx={{
              minWidth: "100px",
              fontWeight: "bold",
              boxShadow: selectedBulkId === bulk_id ? 2 : 0,
              transition: "all 0.2s ease",
            }}
          >
            Bulk {bulk_id}
          </Button>
        ))}
      </Box>

      <Box display="flex" justifyContent="flex-end" alignItems="center" m={2}>
        {selectedBulkId && (
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => setModalOpen(true)}
          >
            Edit Details
          </Button>
        )}
      </Box>

      <Grid
        container
        spacing={3}
        style={{ padding: "20px", justifyContent: "center" }}
      >
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Bulk {selectedBulkId}
          </Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Product Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Variation</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Unit Price</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Total Price</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Actions</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedBulkDetails.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell align="right">
                      ${item.unit_price?.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        value={
                          quantityChanges[index] !== undefined
                            ? quantityChanges[index]
                            : item.quantity
                        }
                        onChange={(e) =>
                          handleQuantityChange(
                            index,
                            parseInt(e.target.value, 10)
                          )
                        }
                        inputProps={{ min: 1 }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      ${item.total_price?.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleConfirmChange(index)}>
                        <Check style={{ color: "green" }} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)}>
                        <Delete style={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {selectedBulk.length === 0 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Typography variant="h6">This bulk is empty.</Typography>
            </Box>
          )}
        </Grid>

        {selectedBulk.length > 0 && (
          <Grid
            item
            xs={12}
            md={8}
            style={{ textAlign: "right", marginTop: "30px" }}
          >
            <Typography variant="h6">
              Total Cart Value: ${calculateTotal().toFixed(2)}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              mt={2}
            >
              <TextField
                type="number"
                value={timesCounter}
                onChange={(e) =>
                  handleTimesChange(parseInt(e.target.value, 10))
                }
                inputProps={{ min: 1 }}
              />
              <Typography variant="h6">
                Payment Value: ${(calculateTotal() * timesCounter).toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePayment}
              >
                Pay Now
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth>
        <DialogTitle>Update Bulk Details</DialogTitle>
        <DialogContent>
          <Box display="flex" gap={2} flexDirection="column" mt={1}>
            <Typography variant="subtitle2" color="textSecondary">
              Bulk ID: {selectedBulkId}
            </Typography>
            <TextField
              label="Name"
              name="name"
              value={bulkMeta.name}
              onChange={handleBulkMetaChange}
              fullWidth
            />
            <TextField
              label="Frequency"
              name="frequency"
              value={bulkMeta.frequency}
              onChange={handleBulkMetaChange}
              fullWidth
            />
            <TextField
              label="Delivery Starting Date"
              name="delivery_starting_date"
              type="date"
              value={bulkMeta.delivery_starting_date}
              onChange={handleBulkMetaChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button
            onClick={handleBulkMetaSubmit}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Bulks;
