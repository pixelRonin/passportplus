import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet

const AdminHome = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className=" bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, Admin
        </h1>
        <p className="mb-4 text-lg text-gray-600">
          Here’s an overview of your administrative activities.
        </p>
        <p className="text-base text-gray-600">
          Use the navigation above to manage users, track applications, and add commissioners. This dashboard is designed to help you efficiently handle your tasks.
        </p>

        {/* Outlet for nested routes */}
        
      </div>
    </div>
  );
};

export default AdminHome;
