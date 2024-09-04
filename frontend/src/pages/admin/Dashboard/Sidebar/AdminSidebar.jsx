import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  CogIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const AdminSidebar = ({ isCollapsed, onSidebarToggle }) => {
  return (
    <aside
      className={`bg-[#002D72] fixed top-16 left-0 h-[calc(100vh-64px)] shadow-lg flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-12' : 'w-20'
      } z-10`}
      onMouseEnter={() => onSidebarToggle(false)}
      onMouseLeave={() => onSidebarToggle(true)}
    >
      {/* Navigation */}
      <nav className="flex-grow mt-6">
        <ul>
          {/* Home */}
          <li>
            <NavLink
              to="adminhome"
              className={({ isActive }) =>
                `flex items-center justify-center p-4 text-white hover:bg-[#003c8e] rounded transition-colors duration-300 ${
                  isActive ? 'bg-[#004b99] font-bold' : ''
                }`
              }
              aria-label="Home"
            >
              <HomeIcon className="h-6 w-6 text-[#00BF57]" />
            </NavLink>
          </li>

          {/* Users Management */}
          <li>
            <NavLink
              to="users"
              className={({ isActive }) =>
                `flex items-center justify-center p-4 text-white hover:bg-[#003c8e] rounded transition-colors duration-300 ${
                  isActive ? 'bg-[#004b99] font-bold' : ''
                }`
              }
              aria-label="Users Management"
            >
              <UserGroupIcon className="h-6 w-6 text-[#00BF57]" />
            </NavLink>
          </li>

          {/* Applications Management */}
          <li>
            <NavLink
              to="applications"
              className={({ isActive }) =>
                `flex items-center justify-center p-4 text-white hover:bg-[#003c8e] rounded transition-colors duration-300 ${
                  isActive ? 'bg-[#004b99] font-bold' : ''
                }`
              }
              aria-label="Applications Management"
            >
              <DocumentChartBarIcon className="h-6 w-6 text-[#00BF57]" />
            </NavLink>
          </li>

          {/* Reports */}
          <li>
            <NavLink
              to="reports"
              className={({ isActive }) =>
                `flex items-center justify-center p-4 text-white hover:bg-[#003c8e] rounded transition-colors duration-300 ${
                  isActive ? 'bg-[#004b99] font-bold' : ''
                }`
              }
              aria-label="Reports"
            >
              <DocumentChartBarIcon className="h-6 w-6 text-[#00BF57]" />
            </NavLink>
          </li>

          {/* Notifications */}
          <li>
            <NavLink
              to="notifications"
              className={({ isActive }) =>
                `flex items-center justify-center p-4 text-white hover:bg-[#003c8e] rounded transition-colors duration-300 ${
                  isActive ? 'bg-[#004b99] font-bold' : ''
                }`
              }
              aria-label="Notifications"
            >
              <BellIcon className="h-6 w-6 text-[#00BF57]" />
            </NavLink>
          </li>

          {/* Settings */}
          <li>
            <NavLink
              to="settings"
              className={({ isActive }) =>
                `flex items-center justify-center p-4 text-white hover:bg-[#003c8e] rounded transition-colors duration-300 ${
                  isActive ? 'bg-[#004b99] font-bold' : ''
                }`
              }
              aria-label="Settings"
            >
              <CogIcon className="h-6 w-6 text-[#00BF57]" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
