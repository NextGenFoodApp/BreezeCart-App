import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Grid } from '@mui/material';
import HeroContent from "./HeroContent";

const CategoryButtonGrid = () => {
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3030/categories')
        .then(response => {
          setCategories(response.data.map(category => category));
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    }, []);
  
    return (
      <Container maxWidth="md">
        <HeroContent>
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
              <Button
                onClick={() => (window.location.href = `/categories/${category.category_id}`)}
                variant="contained"
                sx={{
                  backgroundColor: '#ff4081',
                  color: '#fff',
                  borderRadius: 2,
                  boxShadow: 3,
                  '&:hover': {
                    backgroundColor: '#ff80ab',
                  },
                }}
              >
                {category.category_name}
              </Button>
            </Grid>
          ))}
        </Grid>
        </HeroContent>
      </Container>
    );
  }

export default CategoryButtonGrid;