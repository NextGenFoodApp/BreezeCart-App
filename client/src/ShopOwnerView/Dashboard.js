import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ShopInfo from '../components/ShopInfo';
import ShopProducts from '../components/ShopProducts';


const UserDashboard = () => {

  return (
    <>
      <Typography variant='h2' align='center' style={{alignTop: 50}}>Profile</Typography>
      <ShopInfo/>
      <ShopProducts/>
    </>
  );

}

export default UserDashboard;
