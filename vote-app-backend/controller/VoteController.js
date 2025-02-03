const User = require('../models/UserModel');
const Vote = require('../models/VoteModel');

// Submit a vote
const submitVote = async (req, res) => {
  try {
    const { email, phone, candidate, voterId } = req.body;

    if (!email || !phone || !candidate || !voterId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format. It should be 10 digits.' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    const existingVote = await Vote.findOne({ voterId });
    if (existingVote) {
      return res.status(403).json({ message: 'You have already voted!' });
    }

    const vote = new Vote({ email, phone, candidate, voterId });
    await vote.save();
    res.status(201).json({ message: 'Vote submitted successfully!' });
  } catch (error) {
    console.error('Error submitting vote:', error);
    res.status(500).json({ message: 'Error submitting vote', error });
  }
};

module.exports = { submitVote };
