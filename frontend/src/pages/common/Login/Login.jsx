import React, { useState } from 'react';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext'; // Import the useAuth hook

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth(); // Get the login function from AuthContext

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Both fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${apiUrl}/user/login`, { email, password });

      console.log('Response Data:', response.data);

      const { token, user } = response.data;
      const { id, role } = user; // Extract userId and role from user

      // Store the token, role, and user ID in local storage
      localStorage.setItem('user', JSON.stringify({ token, role, id }));

      // Call the login function to update AuthContext
      login(email, password); // Pass necessary data to AuthContext

      toast.success('Signed in successfully!');

      // Redirect based on user role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'user') {
        navigate('/user-dashboard');
      } else if (role === 'commissioner_of_oath') {
        navigate('/user-dashboard');
      } else {
        toast.error('Unknown role.');
      }
    } catch (err) {
      toast.error('Sign in failed. Please check your credentials.');
      console.error('Login Error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <div className="flex flex-grow items-center justify-center bg-gray-900">
        <div className="w-full max-w-md p-8 bg-gray-700 shadow-lg rounded-lg border border-gray-600">
          <h2 className="text-3xl font-extrabold mb-6 text-green-500 text-center">Login</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex items-center border border-gray-600 rounded-md shadow-sm bg-gray-800">
              <UserIcon className="h-6 w-12 text-gray-400 ml-3" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                required
                placeholder="Email"
                className={`w-full px-4 py-3 bg-gray-700 text-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  emailTouched && !validateEmail(email) ? 'border-red-500 ring-red-500' : ''
                }`}
              />
            </div>
            
            <div className="mb-6 flex items-center border border-gray-600 rounded-md shadow-sm bg-gray-800">
              <LockClosedIcon className="h-6 w-12 text-gray-400 ml-3" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                required
                placeholder="Password"
                className={`w-full px-4 py-3 bg-gray-700 text-white border-none rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  passwordTouched && password.length < 6 ? 'border-red-500 ring-red-500' : ''
                }`}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">Don't have an account?</p>
            <Link
              to="/register"
              className="text-green-500 hover:underline mt-2 inline-block font-medium"
            >
              Sign Up
            </Link>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
