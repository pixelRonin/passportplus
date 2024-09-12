import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserSidebar from '../Dashboard/Sidebar/UserSidebar';

const UserDashboard = () => {
  // State to manage sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to handle sidebar toggle
  const handleSidebarToggle = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <UserHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <UserSidebar isCollapsed={isCollapsed} onToggle={handleSidebarToggle} />

        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-300 p-6 overflow-y-auto mt-10 ${
            isCollapsed ? 'ml-12' : 'ml-40'
          }`}
          style={{ marginLeft: isCollapsed ? '3rem' : '10rem' }} // Adjust margin for overlay effect
        >
          {/* Render the nested route's component */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
