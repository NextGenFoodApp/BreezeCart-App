import React, { useState, useEffect } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { Cancel } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminOrdersTabs = () => {
  const [tabValue, setTabValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [bulkOrders, setBulkOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const serverUrl = "http://localhost:3030"; // Adjust this to your server URL
  axios.defaults.baseURL = serverUrl; // Set the base URL for axios

  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/orders');
      setOrders(response.data);
    } catch (error) {
      showSnackbar('Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchBulkOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/bulk-orders');
      setBulkOrders(response.data);
    } catch (error) {
      showSnackbar('Failed to fetch bulk orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchBulkOrders();
  }, []);

  const cancelOrder = async (id, type = 'normal') => {
    try {
      await axios.patch(type === 'bulk' ? `/bulk-orders/${id}/cancel` : `/orders/${id}/cancel`);
      showSnackbar(`Order #${id} cancelled`, 'success');
      type === 'bulk' ? fetchBulkOrders() : fetchOrders();
    } catch (error) {
      showSnackbar('Failed to cancel order', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderOrderTable = (data, isBulk = false) => (
    <TableContainer component={Paper} elevation={4} sx={{ mt: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#1976d2' }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>ID</TableCell>
            <TableCell sx={{ color: 'white' }}>User ID</TableCell>
            {isBulk ? (
              <>
                <TableCell sx={{ color: 'white' }}>Bulk ID</TableCell>
                <TableCell sx={{ color: 'white' }}>Paid Times</TableCell>
                <TableCell sx={{ color: 'white' }}>Bulk Value</TableCell>
                <TableCell sx={{ color: 'white' }}>Paid Amount</TableCell>
              </>
            ) : (
              <>
                <TableCell sx={{ color: 'white' }}>Total Price</TableCell>
                <TableCell sx={{ color: 'white' }}>Shipping Address</TableCell>
              </>
            )}
            <TableCell sx={{ color: 'white' }}>Status</TableCell>
            <TableCell sx={{ color: 'white' }}>Items</TableCell>
            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order) => (
            <TableRow
                key={isBulk ? order.bulk_order_id : order.order_id}
                hover
                sx={{ cursor: 'normal' }}
            >
              <TableCell>{isBulk ? order.bulk_order_id : order.order_id}</TableCell>
              <TableCell
                sx={{ cursor: 'pointer', color: 'primary.main' }}
                    component="span"
                    onClick={() => navigate(`/adminview/users/${order.user_id}`)}
              >{order.user_id}</TableCell>
              {isBulk ? (
                <>
                  <TableCell
                    sx={{ cursor: 'pointer', color: 'primary.main' }}
                    component="span"
                    onClick={() => navigate(`/adminview/bulks/${order.bulk_id}`)}
                  >{order.bulk_id}</TableCell>
                  <TableCell>{order.paid_times}</TableCell>
                  <TableCell>{order.bulk_value}</TableCell>
                  <TableCell>{order.paid_amount}</TableCell>
                </>
              ) : (
                <>
                  <TableCell>{order.total_price}</TableCell>
                  <TableCell>{order.shipping_address.address_line_1}, 
                    {order.shipping_address.address_line_2}, 
                    {order.shipping_address.city} 
                    {order.shipping_address.postcode}.</TableCell>
                </>
              )}
              <TableCell>{order.status}</TableCell>
              <TableCell 
                sx={{ cursor: 'pointer', color: 'primary.main' }}
                component="span"
                onClick={() => {
                    setSelectedItems(order.items || []);
                    setDialogOpen(true);
                }}
              >Items</TableCell>
              <TableCell>
                <IconButton
                  color="error"
                  onClick={() => {
                    if(order.status === 'Placed') {
                        cancelOrder(isBulk ? order.bulk_order_id : order.order_id, isBulk ? 'bulk' : 'normal')
                    }
                }}
                >
                  <Cancel />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Admin Order Panel
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
        <Tab label="Orders" />
        <Tab label="Bulk Orders" />
      </Tabs>

      {loading ? (
        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          {tabValue === 0 && renderOrderTable(orders)}
          {tabValue === 1 && renderOrderTable(bulkOrders, true)}
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="md"
        >
        <DialogTitle>Order Items</DialogTitle>
        <DialogContent>
            {selectedItems.length === 0 ? (
            <Typography>No items in this order.</Typography>
            ) : (
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Total Price</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {selectedItems.map((item, index) => (
                    <TableRow key={index}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.unit_price}</TableCell>
                    <TableCell>{item.total_price}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            )}
        </DialogContent>
        </Dialog>
    </Box>
  );
};

export default AdminOrdersTabs;
