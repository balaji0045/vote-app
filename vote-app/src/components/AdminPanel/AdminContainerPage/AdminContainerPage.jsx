import React, { useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom"; // ❌ No BrowserRouter here!
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import AdminSidebar from "../AdminSideBar/AdminSideBar";
import AdminHomePage from "../Pages/AdminHomePage/AdminHomePage";
import CandidateView from "../Pages/CandidateView/CandidateView";


const AdminContainerPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <CssBaseline />
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <Box
        component="main"
        sx={{
          marginLeft: sidebarOpen ? "240px" : "0px",
          width: sidebarOpen ? "calc(100% - 240px)" : "100%",
          transition: "margin 0.3s ease, width 0.3s ease",
        //   padding: "20px",
          margin:'0',
        }}
      >
        <Routes>
        <Route path="/" element={<AdminHomePage />} />
          <Route path="dashboard" element={<AdminHomePage />} />
          <Route path="candidate" element={<CandidateView />} />
        </Routes>
      </Box>
    </>
  );
};

export default AdminContainerPage;
