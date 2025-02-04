// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require("./config/db");
const voteRoutes = require("./routes/VoteRoutes"); // Make sure this path is correct
const userRoutes = require('./routes/UserRoutes');  // Similarly for other routes
const candidateRoutes = require('./routes/CandidateRoutes');  // Candidate routes
const path = require("path");



const app = express();

// Middleware
app.use(cors());



// app.use(express.static(path.join(__dirname, 'vote-app', 'build')));


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'vote-app', 'index.html'));
// });

// app.use(cors(corsOptions));


const corsOptions = {
  origin: ["http://localhost:5173"], // Allow localhost & deployed frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));



app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
  

// MongoDB connection
connectDB();  // Ensure that connectDB is called only once

// Routes
app.use('/api/users', userRoutes);  // For user-related routes
app.use('/api/votes', voteRoutes);  // For vote-related routes
app.use('/', voteRoutes);  // For vote-related routes
app.use('/api', candidateRoutes); // For candidate-related routes
app.use(candidateRoutes);

console.log(process.env.MONGO_URI)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
