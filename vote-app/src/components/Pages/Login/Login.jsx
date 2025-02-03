import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import axios from 'axios';
import { useState } from 'react';


import './Login.css'
const Login = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();  // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, formData);
      alert(`Welcome, ${res.data.user.username}`);

      // Save token in localStorage
      localStorage.setItem('token', res.data.token);

      // Navigate to the Users page after successful login
      navigate('/users');  // Redirect to /users page
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  
  return (
    <div className='logincontainer'>
        

  <div className="formcontainer">

  <div className="loginheading">
         <h1>Login</h1>
        </div>


     <Box
     component="form"
     sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
     noValidate
     autoComplete="off"
     className='form'onSubmit={handleSubmit}>

     <div className='username'>
         <TextField
          label="Enter Email"
        id="outlined-size-normal"
          // defaultValue="Small"
          size="small"
          name='email'
          type="email"
          onChange={handleChange}
        />
      </div>

      <div className='password'>
      <TextField
          label="Enter Password"
          id="outlined-size-normal"
          // defaultValue="Small"
          size="small"
          type='password'
          name='password'
          onChange={handleChange}
        />
      </div>

      <div className='buttons'>
        <Button type='submit' variant='outlined' >
            Login
        </Button>
        <Button  variant='outlined'>
        <RouterLink to={'/'}>Back</RouterLink>
        </Button>
      </div>


     </Box>
        </div>


         </div>
  )
}

export default Login
