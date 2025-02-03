// NavBar.js
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './NavBar.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBars } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';

function NavBar() {

    const [isMobile, setisMobile] = useState(true);

  return (
    <nav>
      <div className="navcontainer">
        <div id="logo">
          <h1>Vote App</h1>
        </div>
        <div className={isMobile ? 'navbaroptions' : 'mobile-view-Navbar'}>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/signup">Sign Up</RouterLink></li>
            <li><RouterLink to="/login">Login</RouterLink></li>
            <li><RouterLink to="/contact">Contact Us</RouterLink></li>
          </ul>
        </div>
        <div className="hamburger">
        {/* <GiHamburgerMenu /> */}
        <span onClick={() => setisMobile(!isMobile)} >
            {isMobile ? (
            //   <MdOutlineClose className={`mobile-menu ${theme === 'dark' ? 'dark-mode' : ''}`} />
              <FaBars />
            ) : (
            <MdOutlineClose />

            )}
          </span>
        </div>
        
      </div>
    </nav>
  );
}

export default NavBar;
