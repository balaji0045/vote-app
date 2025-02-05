import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./ContactUs.css";
import { Link as RouterLink } from 'react-router-dom';
import emailjs from "@emailjs/browser";


const ContactUs = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comments: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_to1wnao",
        "template_w4qymtr",
        formData,
        "SieDyVrcev-0nUH13"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Your message has been sent successfully!");
        },
        (error) => {
          console.log(error.text);
        }
      );
    // Reset form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      comments: "",
    });
  };





  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



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
          onSubmit={handleSubmit}
        >
          <TextField
            label="First Name"
            fullWidth
            name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
          />
          <TextField
            label="Last Name"
            fullWidth
            name="lastName"
            value={formData.lastName}
             onChange={handleChange}
          />
          <TextField
            label="Email"
            fullWidth
            name="email"
                  value={formData.email}
                  onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            fullWidth
            name="phone"
              value={formData.phone}
             onChange={handleChange}
          />
          <TextField
            label="Comments"
            multiline
            rows={3}
            fullWidth
            name="comments"
                  value={formData.comments}
                  onChange={handleChange}
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
