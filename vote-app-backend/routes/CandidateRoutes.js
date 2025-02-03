const express = require('express');
const router = express.Router();
const Candidate = require('../models/CandidateModel'); // Adjust the path if needed
const mongoose = require('mongoose');

// Add a candidate
router.post('/candidates', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCandidate = new Candidate({ name, description });
    await newCandidate.save();
    res.status(201).json({ message: 'Candidate added successfully!', candidate: newCandidate });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add candidate', error });
  }
});

// Get all candidates
router.get('/candidates', async (req, res) => {
    try {
      const candidates = await Candidate.find();
      res.status(200).json(candidates);
      console.log(res.json);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      res.status(500).json({ message: 'Failed to fetch candidates' });
    }
  });
  
// Delete a candidate
// In CandidateRoutes.js
router.delete('/api/candidates/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByIdAndDelete(id);
    if (!candidate) {
      return res.status(404).send({ message: 'Candidate not found' });
    }
    res.send({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting candidate' });
  }
});


router.put('/candidates/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCandidate = await Candidate.findByIdAndUpdate(id, { name }, { new: true });
  res.json(updatedCandidate);
});
module.exports = router;
