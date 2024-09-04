// UserDashboard.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../Dashboard/Sidebar/UserSidebar';
import Header from '../../../components/Header/DashboardHeader';

const UserDashboard = () => {
  // State to manage sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Function to handle sidebar toggle
  const handleSidebarToggle = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <UserSidebar isCollapsed={isCollapsed} onSidebarToggle={handleSidebarToggle} />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-12' : 'ml-20'}`}>
        {/* Header */}
        <Header />

        {/* Renders nested route components */}
        <main className="mt-16 flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
