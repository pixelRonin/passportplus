import React, { useState, useRef, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline'; // Profile icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-gray-100 bg-opacity-80 fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 shadow-md text-gray-800 z-10">
      {/* Header Title */}
      <div className="flex items-center">
        <span className="text-lg font-semibold">My Dashboard</span>
      </div>
      {/* Profile Icon and Dropdown */}
      <div className="relative flex items-center">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <UserCircleIcon className="h-10 w-10 text-gray-800" aria-hidden="true" />
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
            role="menu"
            aria-labelledby="dropdown-toggle"
          >
            <button
              onClick={() => navigate('/user-dashboard/userprofile')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Profile
            </button>
            <button
              onClick={() => navigate('/user-dashboard/usersettings')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
