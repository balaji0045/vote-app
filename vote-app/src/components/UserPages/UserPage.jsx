import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import UserNavBar from './UserNavBar/UserNavBar';
import './UserPage.css';
import UserContainer from './UserIndexPage/UserContainer';
import ResultsPage from './ResultsPage.jsx/ResultsPage';
import VotePage from './Vote/VotePage';

const UserPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    } else {
      // Fetch user data from backend
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserData(res.data); // Set user data
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem('token'); // Clear invalid token
          navigate('/login'); // Redirect to login
        });
    }
  }, [navigate]);

  return (
    <div>
      {/* Render Navigation Bar */}
      <UserNavBar />

      {/* Nested Routes */}
      <Routes>
        <Route path="/" element={<UserContainer userData={userData} />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="vote" element={<VotePage/>} />
      </Routes>
    </div>
  );
};

export default UserPage;
