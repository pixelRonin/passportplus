import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Header from '../home/Header'; // Adjust the path based on your file structure

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const navigate = useNavigate();

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
      console.log(`API URL: ${apiUrl}`); // Log URL for debugging
      const response = await axios.post(`${apiUrl}/users/login`, { email, password });
      console.log(`Response Data:`, response.data); // Log response data

      const { token, role } = response.data;
      localStorage.setItem('user', JSON.stringify({ token, role }));

      toast.success('Signed in successfully!');

      // Redirect based on user role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'user') {
        navigate('/user-dashboard');
      } else {
        toast.error('Unknown role.');
      }
    } catch (err) {
      toast.error('Sign in failed. Please check your credentials.');
      console.error('Login Error:', err.response?.data || err.message); // Added for debugging
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-no-repeat bg-gray-100" style={{ backgroundImage: "url('/public/assets/wave-haikei (2).svg')" }}>
      <Header />
      
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center border border-gray-300 rounded-md shadow-sm">
              <UserIcon className="h-6 w-6 text-gray-500 ml-3" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                required
                placeholder="Email"
                className={`w-full px-3 py-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  emailTouched && !validateEmail(email) ? 'border-red-500 ring-red-500' : ''
                }`}
              />
            </div>
            
            <div className="mb-4 flex items-center border border-gray-300 rounded-md shadow-sm">
              <LockClosedIcon className="h-6 w-6 text-gray-500 ml-3" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                required
                placeholder="Password"
                className={`w-full px-3 py-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  passwordTouched && password.length < 6 ? 'border-red-500 ring-red-500' : ''
                }`}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">Don't have an account?</p>
            <Link
              to="/register"
              className="text-blue-500 hover:underline mt-2 inline-block"
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

export default Login;
