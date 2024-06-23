import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TextField, Box } from '@mui/material';
import { Delete, Check } from '@mui/icons-material';
import axios from 'axios';

const Bulks = () => {

  const [user, setUser] = useState(null);
  const [currentBulks, setCurrentBulks] = useState([]);
  const [bulkHistory, setBulkHistory] = useState([]);
  const [selectedBulkId, setSelectedBulkId] = useState(null);
  const [selectedBulk, setSelectedBulk] = useState([]);
  const [selectedBulkDetails, setSelectedBulkDetails] = useState([]);
  const [quantityChanges, setQuantityChanges] = useState({});
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      console.log(localStorage);
      console.log(localStorage.getItem('user'));
      console.log(storedUser);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('Parsed user:', parsedUser);

        if (parsedUser && parsedUser.user_id) {
          try {
            const response = await axios.get(`http://localhost:3030/users/${parsedUser.user_id}`);
            setCurrentBulks(response.data.current_bulk_id);
            console.log('Current Bulks:', response.data.current_bulk_id);
            setBulkHistory(response.data.bulk_history);
            console.log('Bulk History:', response.data.bulk_history);
          } catch (error) {
            console.error('Error fetching user data from API:', error);
          }
        } else {
          console.error('No user ID found in the parsed user object');
        }
      } else {
        console.error('No user found in localStorage');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchBulk = async () => {
    const response = await axios.get(`http://localhost:3030/bulks/${selectedBulkId}`);
    console.log(response);
    setSelectedBulk(response.data.items || []); 
  }

  const fetchBulkDetails = async () => {
    console.log(selectedBulk);
    const bulkDetails = await Promise.all(selectedBulk.map(async (bulkItem) => {
      try {
        const productResponse = await axios.get(`http://localhost:3030/products/${bulkItem.product_id}`);
        const product = productResponse.data;
        const item = product.items.find(item => item.item_id === bulkItem.item_id);
        return {
          product_name: product.product_name,
          unit: item.unit,
          unit_price: item.price,
          quantity: bulkItem.quantity,
          total_price: item.price * bulkItem.quantity
        };
      } catch (error) {
        console.error('Error fetching product data:', error);
        return null;
      }
    }));
    setSelectedBulkDetails(bulkDetails.filter(detail => detail !== null));
    console.log(bulkDetails);
  };

  useEffect(() => {
    fetchBulk();
  }, [selectedBulkId]);

  useEffect(()=>{
    if(selectedBulk.length > 0){
      fetchBulkDetails();
    }
  }, [selectedBulk]); 


  const handleQuantityChange = (index, value) => {
    
  };

  const handleConfirmChange = async(index) => {
    
  };

  const handleDelete = async(index) => {
  
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const calculateTotal = () => {
    return selectedBulkDetails.reduce((total, item) => total + item.total_price, 0);
  };



  return (
    <div>
      <Typography variant='h4' align='center' gutterBottom>Bulks</Typography>
      <Box display='flex' alignItems='center' justifyContent='center'>
        {
          currentBulks.map((bulk_id)=>(
            <Button onClick={() => setSelectedBulkId(bulk_id)}>
              Bulk {bulk_id}
            </Button>
          ))
        }
      </Box>
        <Typography variant='h6' align='center' gutterBottom>Bulk History</Typography>
      <Box display='flex' alignItems='center' justifyContent='center'>
        {
          bulkHistory.map((bulk_id)=>(
            <Button onClick={() => setSelectedBulkId(bulk_id)}>
              Bulk {bulk_id}
            </Button>
          ))
        }
      </Box>
        <Grid container spacing={3} style={{ padding: '20px', justifyContent: 'center' }}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>Bulk {selectedBulkId}</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Product Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Variation</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">Unit Price</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">Quantity</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">Total Price</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedBulkDetails && selectedBulkDetails.length > 0 
                        && selectedBulkDetails.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.product_name}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell align="right">${item.unit_price && item.unit_price.toFixed(2)}</TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          value={quantityChanges[index] !== undefined ? quantityChanges[index] : item.quantity}
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                          inputProps={{ min: 1 }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">${item.total_price && item.total_price.toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleConfirmChange(index)}>
                          <Check style={{ color: 'green' }} />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(index)}>
                          <Delete style={{ color: 'red' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {selectedBulk && selectedBulk.length === 0 && (
                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                  <Typography variant='h6' align='center'>This bulk is empty.</Typography>
                </Box>
            )}
            {!user && (
              <Button variant='contained' color='primary' href='/login'>Login</Button>
            )}
          </Grid>
          {selectedBulk && selectedBulk.length > 0 && (<Grid item xs={12} md={8} style={{ textAlign: 'right', marginTop: '20px' }}>
            <Typography variant="h6">Total Cart Value: ${calculateTotal().toFixed(2)}</Typography>
            <Button variant="contained" color="primary" onClick={handleCheckout} style={{ margin: '10px' }}>
              Checkout 
            </Button>
          </Grid>)}
        </Grid>
    </div>
  )
}

export default Bulks