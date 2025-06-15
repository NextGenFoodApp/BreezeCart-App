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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3030/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:3030/categories/${categoryId}`);
        setCategories((prev) =>
          prev.filter((c) => c.category_id !== categoryId)
        );
      } catch (error) {
        alert("Failed to delete category.");
        console.error(error);
      }
    }
  };

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setEditedName(category.category_name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setEditedName("");
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(
        `http://localhost:3030/categories/${selectedCategory.category_id}`,
        { category_name: editedName }
      );
      setCategories((prev) =>
        prev.map((cat) =>
          cat.category_id === selectedCategory.category_id
            ? { ...cat, category_name: editedName }
            : cat
        )
      );
      handleCloseModal();
    } catch (err) {
      alert("Failed to update category.");
      console.error(err);
    }
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
                sx={{ px: 3, py: 2 }}
                secondaryAction={
                  <Grid container spacing={1}>
                    <Grid item>
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={() => handleOpenModal(category)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(category.category_id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
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

      {/* Edit Category Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Edit Category</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Category Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
            variant="outlined"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button
            onClick={handleUpdateCategory}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminCategoriesPage;
