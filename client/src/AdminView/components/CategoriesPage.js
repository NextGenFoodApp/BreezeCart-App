import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  IconButton,
  Divider,
  Container,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryIcon from "@mui/icons-material/Category";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3030/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:3030/categories/${categoryId}`);
        setCategories(categories.filter((c) => c.category_id !== categoryId));
      } catch (error) {
        alert("Failed to delete category.");
        console.error(error);
      }
    }
  };

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", fontFamily: "'Roboto', sans-serif" }}
      >
        Categories
      </Typography>

      <TextField
        label="Search by category name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <List sx={{ bgcolor: "#f9f9f9", borderRadius: 2, boxShadow: 2 }}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <React.Fragment key={category.category_id}>
              <ListItem
                alignItems="flex-start"
                sx={{ px: 3, py: 2, cursor: "pointer" }}
                onClick={() => handleOpenModal(category)}
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent modal open on delete
                      handleDelete(category.category_id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <CategoryIcon fontSize="large" color="primary" />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      {category.category_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      Category ID: {category.category_id}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ px: 2, py: 3, fontStyle: "italic", color: "text.secondary" }}
          >
            No matching categories found.
          </Typography>
        )}
      </List>

      {/* Category Details Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Category Details</DialogTitle>
        {selectedCategory && (
          <DialogContent dividers>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Category ID:</strong> {selectedCategory.category_id}
            </Typography>
            <Typography variant="body1">
              <strong>Category Name:</strong> {selectedCategory.category_name}
            </Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminCategoriesPage;
