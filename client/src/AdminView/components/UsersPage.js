import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UsersPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3030/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  // Delete user handler
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3030/users/${userId}`);
        setUsers(users.filter((user) => user.user_id !== userId));
      } catch (error) {
        alert("Failed to delete user.");
        console.error(error);
      }
    }
  };

  // Filter users by search term (case insensitive)
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", fontFamily: "'Roboto', sans-serif" }}
      >
        Users
      </Typography>

      <TextField
        label="Search by email"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to filter users..."
      />

      {filteredUsers.length > 0 ? (
        <List
          sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}
        >
          {filteredUsers.map((user) => (
            <React.Fragment key={user.user_id}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 3,
                  py: 1.5,
                }}
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "medium",
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      {user.email}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      ID: {user.user_id} &bull; Role:{" "}
                      {user.is_admin ? "Admin" : "User"}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography
          variant="body1"
          sx={{ mt: 3, fontStyle: "italic", color: "text.secondary" }}
        >
          No users found.
        </Typography>
      )}
    </Container>
  );
};

export default UsersPage;
