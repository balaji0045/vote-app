import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Front from './components/Main/Front';
import Login from './components/Pages/Login/Login';
import SignUp from './components/Pages/SignUp/SignUp';
import ContactUs from './components/ContactUs/ContactUs';
import UserPage from './components/UserPages/UserPage';
import AdminContainerPage from './components/AdminPanel/AdminContainerPage/AdminContainerPage';
import { AuthProvider } from "../src/Context/AuthContext";
import AdminLogin from './components/AdminPanel/AdminLogin/AdminLogin';
import PrivateRoute from "../src/components/AdminPanel/AdminRoute/PrivateRoute";


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/admin/*" element={<PrivateRoute><AdminContainerPage /></PrivateRoute>} />
        <Route path="/adminlogin" element={<AdminLogin />} />


        {/* <Route path="/adminlogin" element={<AdminLogin />} /> */}
        <Route path="/admin/*" element={<AdminContainerPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/users/*" element={<UserPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
