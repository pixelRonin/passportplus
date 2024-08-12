import React from 'react';
import Sidebar from './UserSidebar'; // Import the sidebar component
import DashboardContent from './UserDashboardContent'; // Import the dashboard content component

const UserDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <DashboardContent />
      </div>
    </div>
  );
};

export default UserDashboard;
