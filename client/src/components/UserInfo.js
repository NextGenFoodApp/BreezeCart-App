import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
  Divider,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  LocationCity as CityIcon,
  LocalPostOffice as PostcodeIcon,
} from "@mui/icons-material";
import axios from "axios";

const UserInfo = () => {
  const theme = useTheme();
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      postcode: "",
    },
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser.user_id;
    setUserId(userId);
    axios
      .get(`http://localhost:3030/users/${userId}`)
      .then((response) => {
        const data = response.data;
        const userData = {
          name: data.name,
          email: data.email,
          address: {
            line1: data.address.address_line_1,
            line2: data.address.address_line_2,
            city: data.address.city,
            postcode: data.address.postcode,
          },
          phone: data.phone,
        };
        setUser(userData);
        setOriginalUser(userData);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setUser({
        ...user,
        address: { ...user.address, [addressField]: value },
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    axios
      .post(`http://localhost:3030/users/update`, {
        id: userId,
        name: {
          first_name: user.firstName,
          last_name: user.lastName,
        },
        address: {
          address_line_1: user.address.line1,
          address_line_2: user.address.line2,
          city: user.address.city,
          postcode: user.address.postcode,
        },
        email: user.email,
        phone: user.phone,
      })
      .then(() => {
        setOriginalUser(user);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setUser(originalUser); // Revert to original data on error
      });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUser(originalUser);
  };

  const renderField = (label, value, name, icon) => (
    <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
      <Grid item xs={12} sm={3} sx={{ display: "flex", alignItems: "center" }}>
        {icon}
        <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: "bold" }}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
        {isEditing ? (
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            name={name}
            value={value}
            onChange={handleInputChange}
            sx={{
              backgroundColor: theme.palette.grey[100],
              borderRadius: 1,
            }}
          />
        ) : (
          <Typography variant="body1" sx={{ p: 1 }}>
            {value || "Not provided"}
          </Typography>
        )}
      </Grid>
    </Grid>
  );

  return (
    <Card
      sx={{
        maxWidth: "100%",
        margin: "auto",
        boxShadow: 3,
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          backgroundColor: theme.palette.primary.main,
          color: "white",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          My Profile
        </Typography>
        {isEditing ? (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SaveIcon />}
              onClick={handleSaveClick}
              sx={{ mr: 2 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <IconButton
            color="inherit"
            onClick={handleEditClick}
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>

      <CardContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: "2.5rem",
              bgcolor: theme.palette.secondary.main,
              mb: 2,
            }}
          ></Avatar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {user.firstName} {user.lastName}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          sx={{ mb: 3, fontWeight: "bold", color: theme.palette.primary.main }}
        >
          Personal Information
        </Typography>

        {renderField("Name", user.name, "name", <PersonIcon color="primary" />)}

        {renderField(
          "Email",
          user.email,
          "email",
          <EmailIcon color="primary" />
        )}
        {renderField(
          "Phone",
          user.phone,
          "phone",
          <PhoneIcon color="primary" />
        )}

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          sx={{ mb: 3, fontWeight: "bold", color: theme.palette.primary.main }}
        >
          Address Information
        </Typography>

        {renderField(
          "Address Line 1",
          user.address.line1,
          "address.line1",
          <HomeIcon color="primary" />
        )}
        {renderField(
          "Address Line 2",
          user.address.line2,
          "address.line2",
          <HomeIcon color="primary" />
        )}
        {renderField(
          "City",
          user.address.city,
          "address.city",
          <CityIcon color="primary" />
        )}
        {renderField(
          "Postcode",
          user.address.postcode,
          "address.postcode",
          <PostcodeIcon color="primary" />
        )}
      </CardContent>
    </Card>
  );
};

export default UserInfo;
