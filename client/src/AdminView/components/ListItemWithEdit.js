// components/ListItemWithEdit.jsx
import React from "react";
import { ListItem, ListItemText, IconButton, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const ListItemWithEdit = ({ primary, secondary, editLink }) => {
  const navigate = useNavigate();

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end" onClick={() => navigate(editLink)}>
            <EditIcon />
          </IconButton>
        }
      >
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
      <Divider />
    </>
  );
};

export default ListItemWithEdit;
