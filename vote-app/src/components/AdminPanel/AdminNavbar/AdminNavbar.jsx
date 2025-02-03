import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../../config/firebase"; // Import the logOut function
import "./AdminNavbar.css"; // Import CSS file

const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(); // Call logOut function to log the user out
    navigate("/adminlogin"); // Redirect to the login page after logging out
  };

  return (
    <AppBar position="fixed" className="admin-navbar">
      <Toolbar className="toolbar">
        {/* Left Side: Admin Panel Title */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          className="dashboard-title"
        >
          Admin Panel
        </Typography>

        {/* Right Side: Menu Button and Logout Button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            edge="end"  // Aligns it to the right
            color="inherit" 
            onClick={toggleSidebar} 
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>

          <Button 
            color="inherit" 
            onClick={handleLogout} 
            style={{ marginLeft: '20px' }} // Add some spacing between buttons
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
