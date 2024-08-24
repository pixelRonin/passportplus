import React from 'react';
import AdminSidebar from './AdminSidebar'; // Import the sidebar component
import DashboardContent from './AdminDashboardContent'; // Import the dashboard content component

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <DashboardContent />
      </div>
    </div>
  );
};

export default AdminDashboard;
