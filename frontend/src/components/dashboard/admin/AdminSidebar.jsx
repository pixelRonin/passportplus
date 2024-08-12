import React from 'react';
import { HomeIcon, UserGroupIcon, DocumentChartBarIcon, CogIcon } from '@heroicons/react/24/outline'; // Adjust icons as needed
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>
      <nav className="mt-6">
        <ul>
          <li>
            <Link to="/admin-dashboard/home" className="flex items-center p-4 text-gray-600 hover:bg-gray-100">
              <HomeIcon className="h-6 w-6 mr-3" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/users" className="flex items-center p-4 text-gray-600 hover:bg-gray-100">
              <UserGroupIcon className="h-6 w-6 mr-3" />
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/reports" className="flex items-center p-4 text-gray-600 hover:bg-gray-100">
              <DocumentChartBarIcon className="h-6 w-6 mr-3" />
              Reports
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/settings" className="flex items-center p-4 text-gray-600 hover:bg-gray-100">
              <CogIcon className="h-6 w-6 mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
