import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UserHome from './UserHomepage'; // Import user home component
import UserSettings from './UserSettingspage'; // Import user settings component
import UserProfile from './UserProfilepage'; // Import user profile component

const UserDashboardContent = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<UserHome />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/profile" element={<UserProfile />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default UserDashboardContent;