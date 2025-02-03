import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const AdminSideBar = ({ open, toggleSidebar }) => {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={toggleSidebar}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
        },
      }}
    >
      <List>
        <ListItem component="button" onClick={toggleSidebar}>
          <ListItemIcon><CloseIcon /></ListItemIcon>
          <ListItemText primary="Close" />
        </ListItem>

        <ListItem component={Link} to="/admin/dashboard" onClick={toggleSidebar}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem component={Link} to="/admin/candidate" onClick={toggleSidebar}>
          <ListItemIcon><SupervisorAccountIcon/></ListItemIcon>
          <ListItemText primary="Candidates" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminSideBar;
