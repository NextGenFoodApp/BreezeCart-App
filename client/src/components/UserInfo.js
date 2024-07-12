import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const UserInfo = () => {
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      postcode: '',
    },
    phone: '',
  });

  const [editField, setEditField] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser.user_id;
    setUserId(userId);
    axios.get(`http://localhost:3030/users/${userId}`)
      .then(response => {
        const data = response.data;
        setUser({
          firstName: data.name.first_name,
          lastName: data.name.last_name,
          email: data.email,
          address: {
            line1: data.address.address_line_1,
            line2: data.address.address_line_2,
            city: data.address.city,
            postcode: data.address.postcode,
          },
          phone: data.phone,
        });
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, []);

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setUser({
        ...user,
        address: { ...user.address, [addressField]: value }
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSaveClick = () => {
    setEditField(null);
    axios.post(`http://localhost:3030/users/update`, {
        id: userId,
        name: {
            first_name: user.firstName,
            last_name: user.lastName
        },
        address: {
            address_line_1: user.address.line1,
            address_line_2: user.address.line2,
            city: user.address.city,
            postcode: user.address.postcode
        },
        email: user.email,
        phone: user.phone
    });
  };

  return (
    <Card>
      <CardContent>
        {['firstName', 'lastName', 'email', 'address.line1', 'address.line2', 'address.city', 'address.postcode', 'phone'].map((field, index) => (
          <Grid container key={index} alignItems="center" spacing={1}>
            <Grid item xs={5}>
              <Typography variant="body1">
                {field.split('.').join(' ').replace(/^\w/, (c) => c.toUpperCase())}:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              {editField === field ? (
                <TextField
                  fullWidth
                  variant="standard"
                  name={field}
                  value={field.includes('address.') ? user.address[field.split('.')[1]] : user[field]}
                  onChange={handleInputChange}
                />
              ) : (
                <Typography variant="body2">
                  {field.includes('address.') ? user.address[field.split('.')[1]] : user[field]}
                </Typography>
              )}
            </Grid>
            <Grid item xs={2}>
              {editField === field ? (
                <Button variant="contained" color="primary" onClick={handleSaveClick}>✔️</Button>
              ) : (
                <Button variant="outlined" onClick={() => handleEditClick(field)}>Edit</Button>
              )}
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
};

export default UserInfo;
