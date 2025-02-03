import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, TextField, Typography, Snackbar, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const VoterList = () => {
  const [candidates, setCandidates] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/candidates`);
      const formattedCandidates = response.data.map((candidate, index) => ({
        ...candidate,
        id: index + 1, // Sequential ID starting from 1
        mongoId: candidate._id, // Store MongoDB _id as mongoId for easy access
      }));
      setCandidates(formattedCandidates);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const addCandidate = async () => {
    if (!name) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/candidates`, { name });
      const newCandidate = { ...response.data.candidate, id: candidates.length + 1, mongoId: response.data.candidate._id };
      setCandidates([...candidates, newCandidate]);
      setName('');
      setSnackbarMessage('Candidate added successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const deleteCandidate = async (candidateId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/candidates/${candidateId}`);
      setCandidates(candidates.filter(candidate => candidate.mongoId !== candidateId));
      setSnackbarMessage('Candidate deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting candidate:', error.response ? error.response.data : error);
      setSnackbarMessage(error.response ? error.response.data.message : 'Error deleting candidate!');
      setSnackbarOpen(true);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'name', headerName: 'Candidate Name', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="error" onClick={() => deleteCandidate(params.row.mongoId)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="header-container">
        <Typography variant="h4" gutterBottom>Candidate List</Typography>
      </div>
      <Grid container spacing={3} justifyContent="center">
        {/* Add Candidate Button */}
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)} fullWidth>
            Add Candidate
          </Button>
        </Grid>

        {/* DataGrid Container */}
        <Grid item xs={12}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={candidates}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row.mongoId}
              autoHeight
              disableSelectionOnClick
              components={{
                NoRowsOverlay: () => <div>No data available</div>,
              }}
            />
          </div>
        </Grid>
      </Grid>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />

      {/* Modal for Adding Candidate */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>Add Candidate</Typography>
          <TextField
            label="Candidate Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={addCandidate} fullWidth>
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default VoterList;
