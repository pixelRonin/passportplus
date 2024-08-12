import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import zxcvbn from 'zxcvbn';

const Register = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPasswordChecker, setShowPasswordChecker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setShowPasswordChecker(true);

    // Check password strength
    const result = zxcvbn(newPassword);
    const score = result.score;

    let strength = '';
    switch (score) {
      case 0:
        strength = 'Very Weak';
        break;
      case 1:
        strength = 'Weak';
        break;
      case 2:
        strength = 'Moderate';
        break;
      case 3:
        strength = 'Strong';
        break;
      case 4:
        strength = 'Very Strong';
        break;
      default:
        strength = 'Unknown';
    }

    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/users/register`, { first_name, last_name, email, password });

      setSuccess('Registered successfully!');
      setError('');
      toast.success('Registered successfully! Redirecting to login...');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data.error && err.response.data.error.includes('E11000')) {
        toast.error('An account with this email already exists.');
      } else {
        toast.error('Registration failed. Please try again.');
      }
      setError('Registration failed. Please try again.');
      setSuccess('');
      console.error(err.response?.data || err.message);
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setShowPasswordChecker(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFocusedField('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Registration</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        
        <div className="mb-6 flex items-center border border-gray-300 rounded-md shadow-sm">
          <UserCircleIcon className="h-6 w-6 text-gray-500 ml-3" />
          <input
            id="first_name"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
            onFocus={() => handleFocus('first_name')}
            onBlur={handleBlur}
            className="w-full px-4 py-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6 flex items-center border border-gray-300 rounded-md shadow-sm">
          <UserCircleIcon className="h-6 w-6 text-gray-500 ml-3" />
          <input
            id="last_name"
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
            onFocus={() => handleFocus('last_name')}
            onBlur={handleBlur}
            className="w-full px-4 py-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6 flex items-center border border-gray-300 rounded-md shadow-sm">
          <EnvelopeIcon className="h-6 w-6 text-gray-500 ml-3" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            className="w-full px-4 py-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6 flex items-center border border-gray-300 rounded-md shadow-sm relative">
          <LockClosedIcon className="h-6 w-6 text-gray-500 ml-3" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Password"
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
            className="w-full px-4 py-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
          </button>
        </div>
        
        <div className="mb-6 flex items-center border border-gray-300 rounded-md shadow-sm relative">
          <LockClosedIcon className="h-6 w-6 text-gray-500 ml-3" />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            onFocus={() => handleFocus('confirmPassword')}
            onBlur={handleBlur}
            className="w-full px-4 py-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
          </button>
        </div>
        
        {showPasswordChecker && focusedField === 'password' && (
          <div className="mb-6 mt-4 bg-gray-50 p-4 rounded-md shadow-sm">
            <div className="text-sm text-gray-700">Password Strength: {passwordStrength}</div>
            <div className="mt-2">
              <div className="flex items-center">
                <div className={`w-4 h-4 mr-2 ${password.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>
                  {password.length >= 8 ? '✔' : '✘'}
                </div>
                Minimum 8 characters
              </div>
              <div className="flex items-center mt-1">
                <div className={`w-4 h-4 mr-2 ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-red-500'}`}>
                  {/[A-Z]/.test(password) ? '✔' : '✘'}
                </div>
                At least one uppercase letter
              </div>
              <div className="flex items-center mt-1">
                <div className={`w-4 h-4 mr-2 ${/[a-z]/.test(password) ? 'text-green-500' : 'text-red-500'}`}>
                  {/[a-z]/.test(password) ? '✔' : '✘'}
                </div>
                At least one lowercase letter
              </div>
              <div className="flex items-center mt-1">
                <div className={`w-4 h-4 mr-2 ${/[0-9]/.test(password) ? 'text-green-500' : 'text-red-500'}`}>
                  {/[0-9]/.test(password) ? '✔' : '✘'}
                </div>
                At least one number
              </div>
              <div className="flex items-center mt-1">
                <div className={`w-4 h-4 mr-2 ${/[@$!%*?&#]/.test(password) ? 'text-green-500' : 'text-red-500'}`}>
                  {/@\$!%*?&#/.test(password) ? '✔' : '✘'}
                </div>
                At least one special character
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register
        </button>
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
