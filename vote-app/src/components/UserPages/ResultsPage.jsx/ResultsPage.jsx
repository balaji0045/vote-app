import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

import "./ResultsPage.css"

const ResultsPage = () => {
  const [votes, setVotes] = useState([]);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vote counts
  const fetchVotes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/votes`);
      setVotes(response.data);
    } catch (err) {
      setError("Error fetching votes");
      console.error("Error fetching votes:", err);
    }
  };

  // Fetch winner
  const fetchWinner = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/votes/winner`);
      setWinner(response.data);
    } catch (err) {
      setError("Error fetching winner");
      console.error("Error fetching winner:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchVotes();
      await fetchWinner();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px"}} >
        <CircularProgress />
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div style={{ padding: "20px" }} className="resultcontainer">
      <Typography variant="h4" gutterBottom style={{color:"white"}}>
        Voting Results
      </Typography>

      <Typography variant="h5" gutterBottom  style={{color:"white"}}>
        Candidate-wise Votes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Candidate</strong></TableCell>
              <TableCell align="right"><strong>Total Votes</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {votes.length > 0 ? (
              votes.map((vote) => (
                <TableRow key={vote._id} className={"table-row"}>
                  <TableCell>{vote.candidateName}</TableCell> {/* Display candidate name */}
                  <TableCell align="right">{vote.totalVotes}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No votes available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom style={{ marginTop: "20px", color:'white'}}>
        Winner
      </Typography>
      {winner ? (
        <Typography variant="body1" style={{color:'white'}} className="winner-text">
          <strong style={{color: "#20F228"}} className="child-text">{winner.candidateName}</strong> with <strong style={{color:"#20F228"}}>{winner.totalVotes}</strong> votes!
        </Typography>
      ) : (
        <Typography variant="body1">No winner yet.</Typography>
      )}
    </div>
  );
};

export default ResultsPage;
