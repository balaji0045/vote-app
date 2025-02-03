import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./ContactUs.css";
import { Link as RouterLink } from 'react-router-dom';


const ContactUs = () => {
  return (
    <div className="contactus">
      <div className="header">
        <h1>Contact Us</h1>
      </div>
      <div className="form-container">
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          component="form"
        >
          <TextField
            label="First Name"
            fullWidth
          />
          <TextField
            label="Last Name"
            fullWidth
          />
          <TextField
            label="Email"
            fullWidth
          />
          <TextField
            label="Phone Number"
            fullWidth
          />
          <TextField
            label="Comments"
            multiline
            rows={3}
            fullWidth
          />
          <Button variant="outlined" type="submit">
            Submit
          </Button>
          <Button variant="outlined"  component={RouterLink} to="/">
            GO Back
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default ContactUs;
