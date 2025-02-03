const express = require('express');
const router = express.Router();
const { submitVote } = require('../controller/VoteController');
const Vote = require("../models/VoteModel");

// POST route for submitting votes
router.post('/', submitVote);

// GET route for fetching all vote counts with candidate names
router.get('/', async (req, res) => {
    try {
        const voteCounts = await Vote.aggregate([
            { $group: { _id: "$candidate", totalVotes: { $sum: 1 } } },
            { 
                $lookup: {
                    from: "candidates",       // Name of the candidates collection
                    localField: "_id",        // Field from votes collection (candidate ObjectId)
                    foreignField: "_id",      // Field from candidates collection (candidate ObjectId)
                    as: "candidateDetails"    // Alias for candidate data
                }
            },
            { $unwind: "$candidateDetails" }, // Flatten the candidateDetails array
            { $project: {                      // Project the required fields
                _id: 0, 
                candidateName: "$candidateDetails.name", // Candidate name
                totalVotes: 1
            }}
        ]);
        res.json(voteCounts);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/pie-chart', async (req, res) => {
    try {
        const voteCounts = await Vote.aggregate([
            { 
                $group: { 
                    _id: "$candidate",             // Group by candidate (using their ObjectId as _id)
                    totalVotes: { $sum: 1 }        // Count total votes for each candidate
                }
            },
            { 
                $lookup: {
                    from: "candidates",           // Name of the candidates collection
                    localField: "_id",            // Field from the votes collection (candidate ObjectId)
                    foreignField: "_id",          // Field from the candidates collection (candidate ObjectId)
                    as: "candidateDetails"        // Alias for candidate data
                }
            },
            { $unwind: "$candidateDetails" },  // Flatten the candidateDetails array
            { 
                $project: {                    // Project the required fields
                    _id: 1,                     // Keep the _id (candidate ObjectId)
                    candidateName: "$candidateDetails.name",  // Candidate name
                    totalVotes: 1                // Include the total votes
                }
            }
        ]);

        res.json(voteCounts); // Return the vote counts data with candidate _id
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to get the winner with candidate name
// Ensure this route is in VoteRoutes.js
router.get('/winner', async (req, res) => {
    try {
        const winner = await Vote.aggregate([
            { $group: { _id: "$candidate", totalVotes: { $sum: 1 } } },
            { $sort: { totalVotes: -1 } },
            { $limit: 1 },
            { 
                $lookup: {
                    from: "candidates",
                    localField: "_id",  // Match candidate ObjectId from votes
                    foreignField: "_id",  // Match with candidates collection _id
                    as: "candidateDetails"
                }
            },
            { $unwind: "$candidateDetails" },
            { $project: { 
                candidateName: "$candidateDetails.name",  // Candidate name
                totalVotes: 1
            }}
        ]);
        res.json(winner[0]);  // Return the winner
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
