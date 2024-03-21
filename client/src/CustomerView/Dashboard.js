import React, { useState, useEffect } from 'react';
import { Typography, Container, Paper } from '@mui/material';

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log(storedUser);
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          User Dashboard
        </Typography>
        {user ? (
          <div>
            <Typography variant="body1" gutterBottom>
              Name: {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {user.email}
            </Typography>
            {/* You can display more user details here */}
          </div>
        ) : (
          <Typography variant="body1" gutterBottom>
            No user data found.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default UserDashboard;
