// PrivateRoute.jsx

import React, { useEffect } from 'react';
import { useAuth } from "../../../Context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, allowed, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;

  // Redirect to login if not authenticated or not allowed
  return user && allowed ? children : <Navigate to="/adminlogin" />;
};

export default PrivateRoute;
