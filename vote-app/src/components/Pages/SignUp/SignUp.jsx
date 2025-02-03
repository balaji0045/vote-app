import React from 'react';
import './SignUp.css';
import { TextField, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import  { useState } from 'react';

const SignUp = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    aadhar: '',
    dob: '',
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/signup`, formData);
      alert(res.data.message);
  
      // Reset form data after successful signup
      setFormData({
        username: '',
        email: '',
        password: '',
        phone: '',
        aadhar: '',
        dob: '',
      });
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };
  


  return (
    <div className="SignUpContainer">
      <div className="heading">
        <h1>Sign Up</h1>
      </div>

      <div className="form">
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="Username">
            <TextField
              label="Set Username"
              id="outlined-size-normal"
              size="small"
               name="username"
        value={formData.username}
        onChange={handleChange}
            />
          </div>

          <div className="password">
            <TextField
              label="Set Password"
              id="outlined-size-normal"
              size="small"
              type='password'
              name='password'
              value={formData.password}
        onChange={handleChange}
        required
            />
          </div>

          <div className="email">
            <TextField
              label="Email ID"
              id="outlined-size-normal"
              size="small"
              type='email'
              name='email'
              value={formData.email}
        onChange={handleChange}
        required
            />
          </div>

          <div className="aadhar">
            <TextField
              label="Aadhar Number"
              id="outlined-size-normal"
              size="small"
              name='aadhar'
              value={formData.aadhar}
  onChange={handleChange}
  required

            />
          </div>


          <div className="mobilenumber">
            <TextField
              label="Mobile Number"
              id="outlined-size-normal"
              size="small"
              type='tel'
              name='phone'
              value={formData.phone}
        onChange={handleChange}
        required

            
            />
          </div>

          <div className="date">
            <TextField
              label="DOB"
              id="outlined-size-normal"
              size="small"
              type='date'
              name='dob'
              value={formData.dob}
        onChange={handleChange}
        required
            />
          </div>


          <div className="buttons">
            <Button type="submit" variant="outlined">
              Sign Up
            </Button>
            <Button variant="outlined" component={RouterLink} to="/">
              Back
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default SignUp;
