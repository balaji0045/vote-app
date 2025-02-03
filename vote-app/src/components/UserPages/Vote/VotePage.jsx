import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import './Votepage.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

const VotePage = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [candidate, setCandidate] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');

  // Fetch candidates from the backend
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/candidates`);
        setCandidates(response.data); // Expecting an array of candidates with { _id, name }
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setError('Failed to fetch candidates. Try again later.');
      }
    };

    fetchCandidates();
  }, []);

  const handleChange = (event) => {
    setCandidate(event.target.value); // Store candidate ID
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend Validation
    if (!email || !phone || !candidate) {
      setError('Please fill in all fields');
      return;
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Phone number must be 10 digits.');
      return;
    }

    // Use phone as voterId
    const voterId = phone;  // You can also use email here if preferred

    const voteData = { email, phone, candidate, voterId };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/votes`, voteData);
      console.log(response.data);
      if (response.status === 201) {
        alert('Vote submitted successfully!');
        setEmail('');
        setPhone('');
        setCandidate('');
        setError('');
      }
    } catch (error) {
      console.error('Error during vote submission:', error.response || error);
      setError(error.response ? error.response.data.message : 'An error occurred while submitting your vote.');
    }
  };

  return (
    <div className='votecontainer'>
      <div className="formcontainer">
        <div className="loginheading">
          <h1>Vote</h1>
        </div>

        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          className='form'
        >
          <div className='email'>
            <TextField
              label="Enter Email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>

          <div className='phone-number'>
            <TextField
              label="Enter Phone Number"
              size="small"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className='candidate'>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="candidate-select-label">Select Candidate</InputLabel>
              <Select
                labelId="candidate-select-label"
                value={candidate}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {candidates.map((cand) => (
                  <MenuItem key={cand._id} value={cand._id}>
                    {cand.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Please select a candidate</FormHelperText>
            </FormControl>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className='buttons'>
            <Button type="submit" variant="outlined" onClick={handleSubmit}>
              Place Vote
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

export default VotePage;
