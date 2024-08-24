import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './home/Header';

const HomePage = () => {
  const navigate = useNavigate();

  const handleRegisterButtonClick = () => {
    navigate('/register');
  };

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-800">
      <Header />
      <section className="flex flex-grow">
        <article className="w-full md:w-1/2 text-white p-6 flex flex-col justify-center items-start space-y-4 ml-14">
          <h2 className="text-4xl font-extrabold mb-3 text-green-500">WELCOME TO PASSPORTPLUS</h2>
          <p className="text-lg mb-2">Your gateway to efficient lodging, tracking, and payments.</p>
          <p className="text-lg mb-2">We make passport management simple and hassle-free.</p>
          <p className="text-lg">Start your journey with us today!</p>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              className="bg-orange-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-orange-600 transition-colors duration-300"
              onClick={handleRegisterButtonClick}
            >
              Register
            </button>
            <button
              className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-300"
              onClick={handleLoginButtonClick}
            >
              Login
            </button>
          </div>
        </article>
        <aside className="w-1/2 md:w-1/2 p-6 flex items-center justify-center mr-12">
          <img
            src="/assets/adventure_illustration_home.svg"
            alt="Illustration"
            className="w-3/4 md:w-full max-w-lg max-h-95"
          />
        </aside>
      </section>
    </main>
  );
};

export default HomePage;