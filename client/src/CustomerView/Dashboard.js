import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import UserInfo from '../components/UserInfo';
import UserBulk from '../components/UserBulk';


const UserDashboard = () => {

  return (
    <>
      <Typography variant='h2' align='center' style={{alignTop: 50}}>Profile</Typography>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <UserInfo />
          </Grid>
          <Grid item xs={6}>
            <UserBulk />
          </Grid>
        </Grid>
      </Container>
    </>
  );

}

export default UserDashboard;
