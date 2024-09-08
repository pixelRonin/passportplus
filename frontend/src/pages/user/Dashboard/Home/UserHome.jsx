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

        // Ensure response and response.data exist and contain the expected structure
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
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const steps = [
    {
      title: 'Step 1: Complete the Form',
      description: 'Fill out the passport application form with your details.',
      buttonText: 'Start Application Form',
      onClick: () => navigate('/user-dashboard/userdocuments'),
    },
    {
      title: 'Step 2: Upload Documents',
      description: 'Upload the required documents to complete your application.',
      buttonText: 'Upload Documents',
      onClick: () => navigate('/upload-documents'),
    },
    {
      title: 'Step 3: Make Payment',
      description: 'Proceed to make the payment for your application.',
      buttonText: 'Proceed to Payment',
      onClick: () => navigate('/payment'),
    },
  ];

  return (
    <div className="p-6 bg-white min-h-screen shadow-md rounded-lg">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {userName || 'User'}
        </h1>
        <p className="mt-2 text-gray-600">
          This is your home page. Start your passport application or track your progress.
        </p>
      </header>

      {/* Progress Indicator */}
      <div className="mt-6">
        <div className="flex justify-center items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-700">{step.title}</h2>
            <p className="text-gray-600 mt-2">{step.description}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={step.onClick}
            >
              {step.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Notifications Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        <div className="mt-2 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
          Reminder: Your application form is incomplete. Please complete it to proceed.
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800">Tips for a Smooth Application</h3>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>Ensure all mandatory fields are filled in correctly.</li>
          <li>Prepare clear, high-quality scans of required documents.</li>
          <li>Double-check your contact information for accuracy.</li>
        </ul>
      </div>
    </div>
  );
};

export default UserHome;
