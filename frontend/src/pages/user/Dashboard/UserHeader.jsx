import React, { useState, useRef, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const UserHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Function to get user data from localStorage
  const getUserFromLocalStorage = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user || {}; // Return an empty object if no user data
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return {}; // Return an empty object in case of error
    }
  };

  const user = getUserFromLocalStorage();
  const isCommissionerOfOath = user.role === 'commissioner_of_oath';

  useEffect(() => {
    console.log('User from localStorage:', user); // Debug: Log the user object
    console.log('Is Commissioner of Oath:', isCommissionerOfOath); // Debug: Log the role check
  }, [user, isCommissionerOfOath]);

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
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-gray-100 fixed top-0 left-0 right-0 h-16 shadow-md text-gray-800 z-10 flex items-center justify-between px-6">
      <div className="flex items-center space-x-8">
        <span className="text-lg font-semibold">User Dashboard</span>
      </div>
      <div className="relative">
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
              onClick={() => navigate('/user-dashboard')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/user-dashboard/usersettings')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </button>
            {isCommissionerOfOath && (
              <button
                onClick={() => navigate('/user-dashboard/commissioner-tasks')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Commissioner Tasks
              </button>
            )}
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

export default UserHeader;
