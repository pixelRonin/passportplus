import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../../../components/header/Header'; // Adjust the path as necessary

// Sample card component with ARIA attributes
const Card = ({ title, to }) => (
  <Link
    to={to}
    aria-label={title}
    className="flex flex-col items-center justify-center w-full sm:w-60 md:w-72 lg:w-80 p-4 m-2 bg-white shadow-lg rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
  >
    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h2>
  </Link>
);

const AdminDashboard = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content Wrapper */}
      <div className="flex-1 mt-16"> {/* Adjust mt-16 to match the header height */}
        {/* Card Container */}
        <div className="flex flex-nowrap p-4 gap-4 bg-gray-200 overflow-x-auto">
          <Card title="Home" to="/admin-dashboard/adminhome" />
          <Card title="Users" to="/admin-dashboard/adminuserlist" />
          <Card title="Applications" to="/admin-dashboard/applicationslist" />
          <Card title="Add Commissioner" to="/admin-dashboard/add-commissioner" />
        </div>

        {/* Main Content Area */}
        <main className="p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
