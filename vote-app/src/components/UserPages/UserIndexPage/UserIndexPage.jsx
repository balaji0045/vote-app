import React from 'react';
import voterperson from '../../../assets/vote-person.png';
import './UserIndexPage.css'

const UserIndexPage = ({ userData }) => { // Destructure userData from props
  return (
    <div>
      {userData ? (
        <div className="header1">
          <h1>Welcome, {userData.username}</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* <div className="imagecontainer">
        <img src={userData.profileImage || voterperson} alt="User" />
      </div> */}
    </div>
  );
};

export default UserIndexPage;
