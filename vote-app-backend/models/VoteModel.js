const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  voterId: { type: String, required: true, unique: true },  // Add voterId to the schema
  email: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
