// src/components/UserSidebar.js
import React from 'react';
import { HomeIcon, UserIcon, DocumentTextIcon, CogIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const UserSidebar = () => {
  return (
    <aside className="w-42 bg-gray-800 text-gray-400 h-screen sticky top-0">
      <nav className="mt-6">
        <ul>
          <li>
            <Link to="home" className="flex items-center p-4 text-gray-300 hover:text-gold transition-colors duration-300">
              <HomeIcon className="h-6 w-6 mr-3" />
              <span className="text-base">Home</span>
            </Link>
          </li>
          <li>
            <Link to="profile" className="flex items-center p-4 text-gray-300 hover:text-gold transition-colors duration-300">
              <UserIcon className="h-6 w-6 mr-3" />
              <span className="text-base">Profile</span>
            </Link>
          </li>
          <li>
            <Link to="documents" className="flex items-center p-4 text-gray-300 hover:text-gold transition-colors duration-300">
              <DocumentTextIcon className="h-6 w-6 mr-3" />
              <span className="text-base">Documents</span>
            </Link>
          </li>
          <li>
            <Link to="settings" className="flex items-center p-4 text-gray-300 hover:text-gold transition-colors duration-300">
              <CogIcon className="h-6 w-6 mr-3" />
              <span className="text-base">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default UserSidebar;
