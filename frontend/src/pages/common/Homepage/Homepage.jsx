import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleRegisterButtonClick = () => {
    navigate('/register');
  };

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-b from-blue-800 to-blue-400">
      {/* Navigation Bar */}
      <header className="bg-primary text-white py-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center px-6">
          <div className="text-2xl font-bold font-header cursor-pointer">
            PassportPlus
          </div>
          <ul className="flex space-x-6">
            <li>
              <button
                className="text-white hover:text-secondary transition duration-200"
                onClick={() => handleNavClick('/')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="text-white hover:text-secondary transition duration-200"
                onClick={() => handleNavClick('/about')}
              >
                About
              </button>
            </li>
            <li>
              <button
                className="text-white hover:text-secondary transition duration-200"
                onClick={() => handleNavClick('/contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-16 flex flex-col justify-center items-center text-gray-100">
        <section className="container mx-auto px-6 md:px-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            WELCOME TO PASSPORTPLUS
          </h2>
          <p className="text-lg text-gray-200 mb-4">
            Your gateway to efficient lodging, tracking, and payments.
          </p>
          <p className="text-lg text-gray-200 mb-8">
            We make passport management simple and hassle-free.
          </p>
          <p className="text-lg text-gray-200 mb-12">
            Start your journey with us today!
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              className="bg-secondary text-white py-3 px-8 rounded-lg shadow-lg hover:bg-secondary-light transition-transform transform hover:-translate-y-1 duration-300"
              onClick={handleRegisterButtonClick}
            >
              Register
            </button>
            <button
              className="bg-primary text-white py-3 px-8 rounded-lg shadow-lg hover:bg-primarylight transition-transform transform hover:-translate-y-1 duration-300"
              onClick={handleLoginButtonClick}
            >
              Login
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2024 PassportPlus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
