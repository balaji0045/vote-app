import React from 'react';
import UserIndexPage from './UserIndexPage'; // Import UserIndexPage
import voterperson from '../../../assets/vote-person.png'
const UserContainer = ({ userData }) => {
  return (
    <div className="usercontainer">
      {userData ? (
        <UserIndexPage userData={userData} /> // Pass userData as a prop to UserIndexPage
      ) : (
        <p>Loading...</p>
      )}

      <div className="imagecontainer">
        <img src={voterperson} alt="Voter" />
      </div>
    </div>
  );
};

export default UserContainer;
