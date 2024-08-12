import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './UserHome'; // Import home component
import Profile from './UserProfile'; // Import profile component
import Settings from './UserSettings'; // Import settings component

const UserDashboardContent = () => {
  return (
    <div>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default UserDashboardContent;
