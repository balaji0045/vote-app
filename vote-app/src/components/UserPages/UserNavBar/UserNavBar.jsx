import React, { useState } from 'react';
import './UserNavBar.css';
import { Link as RouterLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';

const UserNavBar = () => {
  const [isMobile, setisMobile] = useState(true);

  return (
    <div>
      <div className="navcontainer">
        <div id="logo">
          <h1>User Page</h1>
        </div>

        <div className={isMobile ? 'navbaroptions' : 'mobile-view-Navbar'}>
          <ul>
            <li>
              <RouterLink to="/users">Home</RouterLink>
            </li>
            <li>
              <RouterLink to="/users/vote">Vote</RouterLink>
            </li>
            <li>
              <RouterLink to="/users/results">View Results</RouterLink>
            </li>
            <li>
              <RouterLink to="/login">Log Out</RouterLink>
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
