import React from 'react';
import { Container, TextField, Typography, Button, Grid, Box, Checkbox, FormControlLabel } from '@mui/material';

const Checkout = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      
      <Box component="form" sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="companyName"
              name="companyName"
              label="Company name"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Street address"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Apartment, suite, etc. (optional)"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="Town / City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Postcode / ZIP"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              autoComplete="phone"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email address"
              fullWidth
              autoComplete="email"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Ship to a different address?"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="orderNotes"
              name="orderNotes"
              label="Order notes (optional)"
              fullWidth
              multiline
              rows={4}
              variant="standard"
            />
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary">
            Place order
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
