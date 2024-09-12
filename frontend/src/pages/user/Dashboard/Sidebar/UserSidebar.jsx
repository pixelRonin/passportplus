import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

const UserSidebar = ({ isCollapsed, onToggle }) => {
  // State to track completed steps
  const [completedSteps, setCompletedSteps] = useState({
    profile: false,
    form: false,
    documents: false,
    payment: false,
  });

  // Initial colors for each step
  const stepColors = {
    profile: 'bg-red-500',
    form: 'bg-blue-500',
    documents: 'bg-yellow-500',
    payment: 'bg-purple-500',
  };

  // Function to handle step completion toggle
  const handleStepToggle = (step) => {
    setCompletedSteps((prevSteps) => ({
      ...prevSteps,
      [step]: !prevSteps[step],
    }));
  };

  return (
    <div
      className={`fixed top-24 left-0 bg-gray-100 shadow-lg transition-all duration-300 z-20 ${
        isCollapsed ? 'w-12' : 'w-40'
      } h-[calc(100vh-8rem)] flex flex-col justify-center items-center cursor-pointer rounded-r-lg`}
      style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
      onClick={() => onToggle(!isCollapsed)}
    >
      <div className="p-2 flex flex-col justify-start items-center w-full">
        {/* Outline of Steps */}
        <div className="mt-6 w-full flex flex-col items-start space-y-3">
          {/* Step 1: Profile Filling */}
          <Link
            to="/user-dashboard/my-profile"
            className="flex items-center cursor-pointer w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleStepToggle('profile');
            }}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                completedSteps.profile ? 'bg-green-500' : stepColors.profile
              }`}
              style={{ flexShrink: 0 }}
            ></div>
            <span className={`ml-4 ${isCollapsed ? 'hidden' : 'truncate w-32'}`}>
              Step 1: Profile Filling
            </span>
          </Link>

          {/* Step 2: Form Completion */}
          <Link
            to="/user-dashboard/userdocuments"
            className="flex items-center cursor-pointer w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleStepToggle('form');
            }}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                completedSteps.form ? 'bg-green-500' : stepColors.form
              }`}
              style={{ flexShrink: 0 }}
            ></div>
            <span className={`ml-4 ${isCollapsed ? 'hidden' : 'truncate w-32'}`}>
              Step 2: Form Completion
            </span>
          </Link>

          {/* Step 3: Documents Upload */}
          <Link
            to="/user-dashboard/userdocumentsupload"
            className="flex items-center cursor-pointer w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleStepToggle('documents');
            }}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                completedSteps.documents ? 'bg-green-500' : stepColors.documents
              }`}
              style={{ flexShrink: 0 }}
            ></div>
            <span className={`ml-4 ${isCollapsed ? 'hidden' : 'truncate w-32'}`}>
              Step 3: Documents Upload
            </span>
          </Link>

          {/* Step 4: Payment */}
          <Link
            to="/user-dashboard/payment"
            className="flex items-center cursor-pointer w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleStepToggle('payment');
            }}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                completedSteps.payment ? 'bg-green-500' : stepColors.payment
              }`}
              style={{ flexShrink: 0 }}
            ></div>
            <span className={`ml-4 ${isCollapsed ? 'hidden' : 'truncate w-32'}`}>
              Step 4: Payment of Processing Fee
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
