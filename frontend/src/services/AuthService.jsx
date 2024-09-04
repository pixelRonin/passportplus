// src/services/AuthService.jsx

// Where the calls from the frontend to the backend 

import axios from 'axios';

// Base API URL; adjust it according to your backend's configuration
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Function to call the api/user/login
export const login = async (email, password) => {
  try {
    // Send a POST request to the login endpoint
    const response = await axios.post(`${apiUrl}/users/login`, { email, password });
    
    // Extract token and user data from the response
    const { token, user } = response.data;
    
    // Return the token and user data
    return { token, user };
  } catch (error) {
    // Handle and throw errors for further handling
    console.error('Error during login:', error);
    throw error;
  }
};

// Function to fetch the user data using a token
export const fetchUser = async (token) => {
  try {
    // Send a GET request to the user endpoint with the token
    const response = await axios.get(`${apiUrl}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Return the user data from the response
    return response.data;
  } catch (error) {
    // Handle and throw errors for further handling
    console.error('Error fetching user:', error);
    throw error;
  }
};
