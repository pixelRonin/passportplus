import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './home/Header'; // Adjust the path based on your file structure

const HomePage = () => {
  const navigate = useNavigate();

  //Register
  const handleLoginClick = () => {
    navigate('/register'); // Redirect to the login page
  };

  //Login
  const handleRegisterClick = () => {
    navigate('./login'); // Redirect to the register page
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Include the Header component */}
      <Header />

      <div className="flex flex-grow">
        {/* Left Side - Headers, Subtitles, and Buttons */}
        <div className="w-1/2 bg-gray-100 text-black p-8 flex flex-col justify-center items-start space-y-6">
          <div className="text-left">
            <h2 className="text-4xl font-bold mb-4">Welcome to PassportPlus</h2>
            <p className="text-lg mb-2">Your gateway to efficient lodging, tracking, and payments.</p>
            <p className="text-lg mb-2">We make passport management simple and hassle-free.</p>
            <p className="text-lg">Start your journey with us today!</p>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              className="bg-orange-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600"
              onClick={handleLoginClick}
            >
              Register
            </button>
            <button
              className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600"
              onClick={handleRegisterClick}
            >
              Login
            </button>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="w-1/2 bg-white p-8 flex items-center justify-center">
          <img
            src="/assets/homepage-travellers.svg" // Correct path to image in public directory
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
