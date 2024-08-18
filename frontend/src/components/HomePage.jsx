import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './home/Header'; // Adjust the path based on your file structure

const HomePage = () => {
  const navigate = useNavigate();

  // Register
  const handleLoginClick = () => {
    navigate('/register'); // Redirect to the register page
  };

  // Login
  const handleRegisterClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/public/assets/wave-haikei (2).svg')",
        backgroundPosition: 'bottom center', // Adjust background position
        backgroundAttachment: 'fixed', // Optional: makes the background stay fixed when scrolling
      }}
    >
      {/* Include the Header component */}
      <Header />

      {/* Content Wrapper */}
      <div className="flex flex-grow">
        {/* Left Side - Headers, Subtitles, and Buttons */}
        <div className="w-full md:w-1/2 text-white p-6 flex flex-col justify-center items-start space-y-4 ml-12">
          <div className="text-left max-w-lg">
            <h2 className="text-4xl font-extrabold mb-3" style={{color: '#00BF57'}}>Welcome to PassportPlus</h2>
            <p className="text-lg mb-2">Your gateway to efficient lodging, tracking, and payments.</p>
            <p className="text-lg mb-2">We make passport management simple and hassle-free.</p>
            <p className="text-lg">Start your journey with us today!</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              className="bg-orange-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-orange-600 transition-colors duration-300"
              onClick={handleLoginClick}
            >
              Register
            </button>
            <button
              style={{ backgroundColor: '#00BF57', color: '#ffffff' }}
              className="py-3 px-6 rounded-lg shadow-lg hover:bg-[#4a0f99] transition-colors duration-300"
              onClick={handleRegisterClick}
            >
              Login
            </button>
          </div>
        </div>

        {/* Right Side - Illustration */}
<div className="w-full md:w-1/2 p-6 flex items-center justify-center">
  <img
    src="/public/assets/undraw_exploring_re_grb8.svg" // Correct path to image in public directory
    alt="Illustration"
    className="w-3/4 md:w-full max-w-lg max-h-96 object-contain" // Increased width and max-width
    style={{ padding: '0.5rem' }} // Reduce padding around the image
  />
</div>
      </div>
    </div>
  );
};

export default HomePage;
