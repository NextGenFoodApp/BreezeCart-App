import React, { useState, useEffect } from 'react';
import { Typography, Container, Paper } from '@mui/material';

const ShopDashboard = () => {
  const [shop, setShop] = useState(null);

  useEffect(() => {
    // Retrieve shop details from localStorage
    const storedShop = localStorage.getItem('shop');
    if (storedShop) {
      setShop(JSON.parse(storedShop));
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Shop Dashboard
        </Typography>
        {shop ? (
          <div>
            <Typography variant="body1" gutterBottom>
              Shop Name: {shop.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Location: {shop.location}
            </Typography>
            {/* You can display more shop details here */}
          </div>
        ) : (
          <Typography variant="body1" gutterBottom>
            No shop data found.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ShopDashboard;
