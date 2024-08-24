// Importing Libraries
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importing Components
import { login } from '../../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailTouched(true);
    setPasswordTouched(true);

    if (!email || !password) {
      toast.error('Both fields are required.');
      return;
    }

    setLoading(true);

    try {
      const { token, role } = await login(email, password);

      localStorage.setItem('user', JSON.stringify({ token, role }));

      // Redirect based on user role
      switch (role) {
        case 'admin':
          // toast.success('Signed in successfully!');
          navigate('/admin-dashboard');
          break;
        case 'user':
          // toast.success('Signed in successfully!');
          navigate('/user-dashboard');
          break;
        default:
          toast.error('Unknown role.');
      }
    } catch (err) {
      toast.error('Sign in failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-no-repeat bg-gray-100">
  
      
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