import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon } from '@heroicons/react/24/outline'; // Import Heroicons

const Sidebar = ({ isCollapsed, onToggle }) => {
  // State to manage sidebar hover
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle sidebar hover
  const handleSidebarHover = (hoverState) => {
    setIsHovered(hoverState);
  };

  return (
    <div
      className={`fixed top-0 left-0 shadow-lg transition-all duration-300 z-20 ${
        isCollapsed ? 'w-16' : 'w-64'
      } h-full flex flex-col bg-primary text-white`}
      onMouseEnter={() => handleSidebarHover(true)} // Expand on hover
      onMouseLeave={() => handleSidebarHover(false)} // Collapse on mouse leave
    >
      {/* Profile Section */}
      <div className="p-4 border-b border-secondary">
        <div
          className={`flex items-center justify-center ${
            isCollapsed ? 'w-12 h-12' : 'w-24 h-24'
          } rounded-full bg-secondary overflow-hidden`}
        >
          {/* Placeholder for profile picture */}
          <img
            src="https://via.placeholder.com/150" // Replace with actual profile picture URL
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <span className={`block text-center mt-2 ${isCollapsed ? 'text-sm' : 'text-base'}`}>
          User Name
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow p-4">
        <Link
          to="/user-dashboard"
          className={`block p-2 mb-2 rounded flex items-center ${
            isCollapsed ? 'text-center text-sm' : 'text-base'
          } bg-opacity-20 hover:bg-secondary hover:text-white transition-colors`}
        >
          <HomeIcon className={`w-6 h-6 ${isHovered || !isCollapsed ? 'text-secondary' : 'text-secondary'}`} />
          <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>
            Home
          </span>
        </Link>

        <Link
          to="/user-dashboard/my-profile"
          className={`block p-2 mb-2 rounded flex items-center ${
            isCollapsed ? 'text-center text-sm' : 'text-base'
          } bg-opacity-20 hover:bg-secondary hover:text-white transition-colors`}
        >
          <UserIcon className={`w-6 h-6 ${isHovered || !isCollapsed ? 'text-secondary' : 'text-secondary'}`} />
          <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>
            Profile
          </span>
        </Link>

        <Link
          to="/settings"
          className={`block p-2 mb-2 rounded flex items-center ${
            isCollapsed ? 'text-center text-sm' : 'text-base'
          } bg-opacity-20 hover:bg-secondary hover:text-white transition-colors`}
        >
          <CogIcon className={`w-6 h-6 ${isHovered || !isCollapsed ? 'text-secondary' : 'text-secondary'}`} />
          <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>
            Settings
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
