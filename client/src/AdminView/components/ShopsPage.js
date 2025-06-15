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
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminShopsPage = () => {
  const [shops, setShops] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedShop, setSelectedShop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3030/shops").then((res) => {
      setShops(res.data);
    });
  }, []);

  const handleDelete = async (shopId) => {
    if (window.confirm("Are you sure you want to delete this shop?")) {
      try {
        await axios.delete(`http://localhost:3030/shops/${shopId}`);
        setShops(shops.filter((shop) => shop.shop_id !== shopId));
      } catch (error) {
        alert("Failed to delete shop.");
        console.error(error);
      }
    }
  };

  const handleOpenModal = (shop) => {
    setSelectedShop(shop);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShop(null);
  };

  const filteredShops = shops.filter((shop) =>
    shop.shop_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", fontFamily: "'Roboto', sans-serif" }}
      >
        Shops
      </Typography>

      <TextField
        label="Search by shop name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <List sx={{ bgcolor: "#f9f9f9", borderRadius: 2, boxShadow: 2 }}>
        {filteredShops.length > 0 ? (
          filteredShops.map((shop) => (
            <React.Fragment key={shop.shop_id}>
              <ListItem
                alignItems="flex-start"
                sx={{ px: 3, py: 2, cursor: "pointer" }}
                onClick={() => handleOpenModal(shop)}
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent opening modal on delete
                      handleDelete(shop.shop_id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      src={shop.logo}
                      alt={shop.shop_name}
                      sx={{ width: 56, height: 56 }}
                    />
                  </Grid>
                  <Grid item xs={10} sm container>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        {shop.shop_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: "'Roboto', sans-serif" }}
                      >
                        Shop ID: {shop.shop_id} &nbsp;|&nbsp; Owner:{" "}
                        {shop.shop_owner}
                      </Typography>
                    </Grid>
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
            No matching shops found.
          </Typography>
        )}
      </List>

      {/* Modal for Shop Details */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Shop Details</DialogTitle>
        {selectedShop && (
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Avatar
                  src={selectedShop.logo}
                  alt={selectedShop.shop_name}
                  sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
                  variant="rounded"
                />
                <Typography variant="h6" gutterBottom>
                  {selectedShop.shop_name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Shop ID:</strong> {selectedShop.shop_id}
                </Typography>
                <Typography>
                  <strong>Owner:</strong> {selectedShop.shop_owner}
                </Typography>
                <Typography>
                  <strong>Address:</strong> {selectedShop.address}
                </Typography>
                <Typography>
                  <strong>Postal Code:</strong> {selectedShop.postal_code}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {selectedShop.phone_no}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {selectedShop.email}
                </Typography>
                <Typography>
                  <strong>Products:</strong>{" "}
                  {selectedShop.products?.length || 0}
                </Typography>
                <Typography>
                  <strong>Orders:</strong> {selectedShop.orders?.length || 0}
                </Typography>
                <Typography>
                  <strong>Last Updated:</strong>{" "}
                  {new Date(selectedShop.updatedAt).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
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

export default AdminShopsPage;
