import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userServices from '../../../../services/userService';

const UserHome = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userServices.getUserProfile();

        if (response && response.data) {
          const { first_name, last_name } = response.data;
          setUserName(`${first_name} ${last_name}`);
        } else {
          throw new Error('User data is not available');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-primarylight">
        <p className="text-primary">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-primarylight">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const steps = [
    {
      title: 'Start Application',
      description: 'Complete your application process in steps.',
      buttonText: 'Go to Application',
      onClick: () => navigate('/user-dashboard/userdocuments'),
    },
    {
      title: 'Upload Documents',
      description: 'Upload your required documents here.',
      buttonText: 'Upload',
      onClick: () => navigate('/upload-documents'),
    },
    {
      title: 'Make Payment',
      description: 'Complete your payment for the application.',
      buttonText: 'Pay Now',
      onClick: () => navigate('/payment'),
    },
  ];

  return (
    <div className="p-6 bg-primarylight min-h-screen font-body">
      {/* Dashboard Header */}
      <header className="text-center mb-6">
        <h1 className="text-header1 font-header text-primary">
          Welcome, {userName || 'User'}
        </h1>
        <p className="text-body text-gray-700">Dashboard Overview</p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Cards */}
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between border border-secondary"
          >
            <h2 className="text-xl font-bold text-primary">{step.title}</h2>
            <p className="text-gray-600 mt-2">{step.description}</p>
            <button
              className="mt-4 bg-secondary text-white px-4 py-2 rounded hover:bg-tertiary transition-colors duration-300"
              onClick={step.onClick}
            >
              {step.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Notifications */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-primary">Notifications</h3>
        <div className="bg-yellow-100 p-4 mt-2 rounded-lg text-yellow-800">
          You have incomplete steps in your application. Please complete them to proceed.
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-primary">Tips for Success</h3>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>Ensure all fields are filled out correctly.</li>
          <li>Have your documents ready for upload.</li>
          <li>Double-check your contact details.</li>
        </ul>
      </div>
    </div>
  );
};

export default UserHome;
