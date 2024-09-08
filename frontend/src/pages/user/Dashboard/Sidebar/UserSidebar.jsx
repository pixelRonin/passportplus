import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, DocumentTextIcon, CreditCardIcon, ClipboardDocumentCheckIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

const UserSidebar = ({ isCollapsed, onSidebarToggle }) => {
  return (
    <aside
      className={`bg-[#002D72] fixed top-0 left-0 h-full shadow-lg flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-12' : 'w-20'
      } z-10`}
      onMouseEnter={() => onSidebarToggle(false)}
      onMouseLeave={() => onSidebarToggle(true)}
    >
      <nav className="flex-grow mt-16">
        <ul>
          {/* Home */}
          <li>
            <NavLink
              to="/user-dashboard/userhome" // Use absolute path
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
          {/* Passport Application Form */}
          <li>
            <NavLink
              to="/user-dashboard/userdocuments" // Use absolute path
              className={({ isActive }) =>
                `flex items-center justify-center p-4 text-white hover:bg-[#003c8e] rounded transition-colors duration-300 ${
                  isActive ? 'bg-[#004b99] font-bold' : ''
                }`
              }
              aria-label="Passport Application Form"
            >
              <DocumentTextIcon className="h-6 w-6 text-[#00BF57]" />
            </NavLink>
          </li>
          {/* Uploads */}
          <li>
            <NavLink
              to="/user-dashboard/userdocumentsupload" // Use absolute path
              className={({ isActive }) =>
                `flex items-center justify-center p-4 text-white hover:bg-[#003c8e] rounded transition-colors duration-300 ${
                  isActive ? 'bg-[#004b99] font-bold' : ''
                }`
              }
              aria-label="Uploads"
            >
              <ArrowUpTrayIcon className="h-6 w-6 text-[#00BF57]" />
            </NavLink>
          </li>
          {/* Payment */}
          <li>
            <NavLink
              to="/user-dashboard/payment" // Use absolute path
              className={({ isActive }) =>
                `flex items-center justify-center p-4 text-white hover:bg-[#003c8e] rounded transition-colors duration-300 ${
                  isActive ? 'bg-[#004b99] font-bold' : ''
                }`
              }
              aria-label="Payment"
            >
              <CreditCardIcon className="h-6 w-6 text-[#00BF57]" />
            </NavLink>
          </li>
          {/* Application Status */}
          <li>
            <NavLink
              to="/user-dashboard/application-status" // Use absolute path
              className={({ isActive }) =>
                `flex items-center justify-center p-4 text-white hover:bg-[#003c8e] rounded transition-colors duration-300 ${
                  isActive ? 'bg-[#004b99] font-bold' : ''
                }`
              }
              aria-label="Application Status"
            >
              <ClipboardDocumentCheckIcon className="h-6 w-6 text-[#00BF57]" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default UserSidebar;
