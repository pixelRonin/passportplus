// AdminDashboard.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../Dashboard/Sidebar/AdminSidebar'; // Adjust the import path as necessary
import Header from '../../../components/Header/DashboardHeader'; // Reusing the same header

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Renders nested route components */}
        <main className="ml-20 mt-16 flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
