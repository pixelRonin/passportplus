import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  DocumentCheckIcon,
  ArrowUpTrayIcon,
  CreditCardIcon,
  PaperAirplaneIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { logout } from '../../../../services/authService'; // Import the logout function

const Sidebar = ({ isCollapsed }) => {
  const [isHovered, setIsHovered] = useState(false);
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

  const handleSidebarHover = (hoverState) => {
    setIsHovered(hoverState);
  };

  const handleLogout = async () => {
    try {
      // Call the logout function from AuthService
      await logout();

      // Redirect the user to the login page after logout
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 shadow-lg transition-all duration-300 z-20 ${
        isCollapsed ? 'w-16' : 'w-64'
      } h-full flex flex-col bg-primary text-white`}
      onMouseEnter={() => handleSidebarHover(true)}
      onMouseLeave={() => handleSidebarHover(false)}
    >
      <div className="flex-grow p-4">
        {/* Dashboard Section */}
        <div className="mb-6">
          <h3 className={`text-white text-sm uppercase tracking-wide mb-2 ${isCollapsed ? 'hidden' : 'block'} font-header`}>
            Dashboard
          </h3>
          <Link
            to="/user-dashboard"
            className={`p-2 mb-2 rounded flex items-center ${
              isCollapsed ? 'text-center text-sm' : 'text-base'
            } bg-opacity-20 hover:bg-tertiary hover:text-white transition-colors font-body`}
          >
            <HomeIcon className={`w-6 h-6 ${isHovered || !isCollapsed ? 'text-secondary' : 'text-secondary'}`} />
            <span className={`ml-3 text-secondary  ${isCollapsed ? 'hidden' : 'block'}`}>Home</span>
          </Link>
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <h3 className={`text-white text-sm uppercase tracking-wide mb-2 ${isCollapsed ? 'hidden' : 'block'} font-header`}>
            Account
          </h3>
          <Link
            to="/user-dashboard/my-profile"
            className={`p-2 mb-2 rounded flex items-center ${
              isCollapsed ? 'text-center text-sm' : 'text-base'
            } bg-opacity-20 hover:bg-tertiary hover:text-white transition-colors font-body`}
          >
            <UserIcon className={`w-6 h-6 ${isHovered || !isCollapsed ? 'text-secondary' : 'text-secondary'}`} />
            <span className={`ml-3 text-secondary  ${isCollapsed ? 'hidden' : 'block'}`}>Profile</span>
          </Link>

          <Link
            to="/user-dashboard/payment"
            className={`p-2 mb-2 rounded flex items-center ${
              isCollapsed ? 'text-center text-sm' : 'text-base'
            } bg-opacity-20 hover:bg-tertiary hover:text-white transition-colors font-body`}
          >
            <CreditCardIcon className={`w-6 h-6 ${isHovered || !isCollapsed ? 'text-secondary' : 'text-secondary'}`} />
            <span className={`ml-3 text-secondary  ${isCollapsed ? 'hidden' : 'block'}`}>Payment</span>
          </Link>
        </div>

        {/* Application Section */}
        <div className="mb-6">
          <h3 className={`text-white text-sm uppercase tracking-wide mb-2 ${isCollapsed ? 'hidden' : 'block'} font-header`}>
            Applications
          </h3>
          <Link
            to="/user-dashboard/user-documents"
            className={`p-2 mb-2 rounded flex items-center ${
              isCollapsed ? 'text-center text-sm' : 'text-base'
            } bg-opacity-20 hover:bg-tertiary hover:text-white transition-colors font-body`}
          >
            <DocumentCheckIcon className={`w-6 h-6 ${isHovered || !isCollapsed ? 'text-secondary' : 'text-secondary'}`} />
            <span className={`ml-3 text-secondary ${isCollapsed ? 'hidden' : 'block'}`}>Documents</span>
          </Link>

          <Link
            to="/user-dashboard/uploads"
            className={`p-2 mb-2 rounded flex items-center ${
              isCollapsed ? 'text-center text-sm' : 'text-base'
            } bg-opacity-20 hover:bg-tertiary hover:text-white transition-colors font-body`}
          >
            <ArrowUpTrayIcon className={`w-6 h-6 ${isHovered || !isCollapsed ? 'text-secondary' : 'text-secondary'}`} />
            <span className={`ml-3 text-secondary ${isCollapsed ? 'hidden' : 'block'}`}>Upload</span>
          </Link>

          <Link
            to="/user-dashboard/passport-application"
            className={`p-2 mb-2 rounded flex items-center ${
              isCollapsed ? 'text-center text-sm' : 'text-base'
            } bg-opacity-20 hover:bg-tertiary hover:text-white transition-colors font-body`}
          >
            <PaperAirplaneIcon className={`w-6 h-6 ${isHovered || !isCollapsed ? 'text-secondary' : 'text-secondary'}`} />
            <span className={`ml-3 text-secondary ${isCollapsed ? 'hidden' : 'block'}`}>My Submission</span>
          </Link>
        </div>

        {/* Commissioner Section (conditionally rendered) */}
        {isCommissionerOfOath && (
          <div className="mb-6">
            <h3 className={`text-white text-sm uppercase tracking-wide mb-2 ${isCollapsed ? 'hidden' : 'block'} font-header`}>
              Commissioner Tasks
            </h3>
            <Link
              to="/user-dashboard/commissioner-tasks"
              className={`p-2 mb-2 rounded flex items-center ${
                isCollapsed ? 'text-center text-sm' : 'text-base'
              } bg-opacity-20 hover:bg-tertiary hover:text-white transition-colors font-body`}
            >
              <DocumentCheckIcon className={`w-6 h-6 ${isHovered || !isCollapsed ? 'text-secondary' : 'text-secondary'}`} />
              <span className={`ml-3 text-secondary ${isCollapsed ? 'hidden' : 'block'}`}>Commissioner Tasks</span>
            </Link>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-secondary">
        <button
          onClick={handleLogout} // Handle logout here
          className={`w-full p-2 rounded flex items-center justify-center bg-opacity-20 hover:bg-red-500 hover:text-white transition-colors ${
            isCollapsed ? 'text-center text-sm' : 'text-base'
          } font-body`}
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6 text-secondary" />
          <span className={`ml-3 text-secondary ${isCollapsed ? 'hidden' : 'block'}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
