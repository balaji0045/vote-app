import React, { useState } from 'react';
import './UserNavBar.css';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';


const UserNavBar = () => {
  const [isMobile, setisMobile] = useState(true);


  const navigate = useNavigate(); // Use useNavigate instead of Navigate

  const logoutController = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate('/login'); // Redirects to login page
    } else {
      navigate('/users'); // Keeps user on the users page
    }
  };

  return (
    <div>
      <div className="navcontainer">
        <div id="logo">
          <h1>User Page</h1>
        </div>

        <div className={isMobile ? 'navbaroptions' : 'mobile-view-Navbar'}>
          <ul>
            <li className='navbutton'>
              <RouterLink to="/users">Home</RouterLink>
            </li>
            <li className='navbutton'>
              <RouterLink to="/users/vote">Vote</RouterLink>
            </li>
            <li className='navbutton'>
              <RouterLink to="/users/results">View Results</RouterLink>
            </li>
            <li className='logoutbutton' >
              {/* <RouterLink to="/login" onClick={logoutController}>Log Out</RouterLink> */}
              <RouterLink to="#" onClick={(e) => { e.preventDefault(); logoutController(); }}>
                Log Out
              </RouterLink>
              
            </li>
          </ul>
        </div>

        <div className="hamburger">
          <span onClick={() => setisMobile(!isMobile)}>
            {isMobile ? <FaBars /> : <MdOutlineClose />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserNavBar;
