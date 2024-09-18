// src/services/AuthService.jsx

import apiClient from '../services/api'; // Import the configured axios instance

// Function to call the api/user/login
export const login = async (email, password) => {
  try {
    // Use apiClient instead of axios
    const response = await apiClient.post('/user/login', { email, password });
    
    // Extract token and user data from the response
    const { token, user } = response.data;
    
    // Return the token and user data
    return { token, user };
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Function to fetch the user data using a token
export const fetchUser = async (token) => {
  try {
    // Use apiClient which already sets the Authorization header
    const response = await apiClient.get('/user/me');

    // Return the user data from the response
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Function to handle the logout process
export const logout = async () => {
  try {
    // Send the logout request to the backend
    const response = await apiClient.post('/user/logout');

    // Clear token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return response.data;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};
