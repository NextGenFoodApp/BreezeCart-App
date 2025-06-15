import React, { useState, useEffect } from "react";
import {
  Fab,
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const SelectBulk = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentBulks, setCurrentBulks] = useState([]);
  const [storedBulkId, setStoredBulkId] = useState(
    JSON.parse(localStorage.getItem("bulk_id"))
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStoredBulkId(JSON.parse(localStorage.getItem("bulk_id")));
  }, []);

  const fetchUserData = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser && parsedUser.user_id) {
          const response = await axios.get(
            `http://localhost:3030/users/${parsedUser.user_id}`
          );
          setCurrentBulks(response.data.current_bulk_id || []);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredBulkId(localStorage.getItem("bulk_id"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleButtonClick = (bulk_id) => {
    localStorage.setItem("bulk_id", bulk_id);
    setStoredBulkId(bulk_id);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleCreateNewBulk = async () => {
    console.log("Creating new bulk...");
    console.log("User ID: ", user.user_id);
    if (!user?.user_id) return;

    try {
      setLoading(true);
      console.log("User ID: ", user.user_id);
      const res = await axios.post("http://localhost:3030/bulks/default", {
        user_id: user.user_id,
      });
      console.log("New bulk created: -------- ", res.data);
      const newBulkId = res.data.bulk?.bulk_id;
      if (newBulkId) {
        await fetchUserData(); // refresh list
        alert("New bulk created successfully!");
      }
    } catch (error) {
      console.error("Failed to create new bulk:", error);
      alert("Failed to create bulk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleDrawerOpen}
          style={{
            position: "fixed",
            right: 20,
            bottom: "70%",
            transform: "translateY(50%)",
            zIndex: 1000,
          }}
        >
          <AddIcon />
        </Fab>

        <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
          <Box
            sx={{ width: 300, padding: 3 }}
            role="presentation"
            display="flex"
            flexDirection="column"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h5" fontWeight="bold">
                Bulk Manager
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
              {currentBulks.map((bulk_id) => (
                <Button
                  key={bulk_id}
                  onClick={() => handleButtonClick(bulk_id)}
                  variant={storedBulkId === bulk_id ? "contained" : "outlined"}
                  color="primary"
                  sx={{ borderRadius: 2, minWidth: 100 }}
                >
                  Bulk {bulk_id}
                </Button>
              ))}
            </Box>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleCreateNewBulk}
              disabled={loading}
              sx={{
                mt: "auto",
                borderRadius: 2,
                fontWeight: "bold",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create New Bulk"
              )}
            </Button>
          </Box>
        </Drawer>
      </div>
    </div>
  );
};

export default SelectBulk;
