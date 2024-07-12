import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';

const UserBulk = () => {
  const [userId, setUserId] = useState(0);
  const [currentBulkIds, setCurrentBulkIds] = useState([]);
  const [bulkHistoryIds, setBulkHistoryIds] = useState([]);
  const [bulkDetails, setBulkDetails] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser.user_id;
    setUserId(userId);
    // Fetch user data
    axios.get(`http://localhost:3030/users/${userId}`)
      .then(response => {
        const data = response.data;
        setCurrentBulkIds(data.current_bulk_id);
        setBulkHistoryIds(data.bulk_history);

        // Fetch bulk details for current and history bulks
        return axios.get('http://localhost:3030/bulks');
      })
      .then(response => {
        const bulkData = response.data.reduce((acc, bulk) => {
          acc[bulk.bulk_id] = bulk;
          return acc;
        }, {});
        setBulkDetails(bulkData);
      })
      .catch(error => {
        console.error('There was an error fetching the bulk data!', error);
      });
  }, []);

  const handleDeactivate = (id) => {
    setCurrentBulkIds(currentBulkIds.filter(bulkId => bulkId !== id));
    setBulkHistoryIds([...bulkHistoryIds, id]);
    axios.post(`http://localhost:3030/users/deactivate-bulk`,{
        bulkId: id 
    });
  };

  const handleActivate = (id) => {
    setBulkHistoryIds(bulkHistoryIds.filter(bulkId => bulkId !== id));
    setCurrentBulkIds([...currentBulkIds, id]);
    axios.post(`http://localhost:3030/users/activate-bulk`,{
        bulkId: id 
    });
  };

  useEffect(()=>{
    axios.post(`http://localhost:3030/users/update-bulks`,{
        userId: userId,
        currentBulks: currentBulkIds,
        bulkHistory: bulkHistoryIds
    });
  },[currentBulkIds, bulkHistoryIds]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Current Bulks</Typography>
        {currentBulkIds.map((id, index) => (
          <Grid container key={index} alignItems="center" spacing={1}>
            <Grid item xs={8}>
              <Button fullWidth variant="outlined">
                {bulkDetails[id] ? `${id} - ${bulkDetails[id].bulk_name}` : `Bulk ID: ${id}`}
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="secondary" onClick={() => handleDeactivate(id)}>Deactivate</Button>
            </Grid>
          </Grid>
        ))}

        <Typography variant="h6" style={{ marginTop: '20px' }}>Bulk History</Typography>
        {bulkHistoryIds.map((id, index) => (
          <Grid container key={index} alignItems="center" spacing={1}>
            <Grid item xs={8}>
              <Button fullWidth variant="outlined">
                {bulkDetails[id] ? `${id} - ${bulkDetails[id].bulk_name}` : `Bulk ID: ${id}`}
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" onClick={() => handleActivate(id)}>Activate</Button>
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
};

export default UserBulk;
