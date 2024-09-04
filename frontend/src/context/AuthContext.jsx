// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, fetchUser } from '../services/AuthService.jsx'; // Import services from AuthService.jsx

// Create the AuthContext with an undefined default value
const AuthContext = createContext(undefined);

// AuthProvider component that wraps the application and provides auth state and functions
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the current user
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status

  // Effect to check if the user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
    if (token) {
      // If token exists, fetch the user data
      fetchUser(token)
        .then(user => {
          setUser(user); // Set the fetched user data
          setIsAuthenticated(true); // Set authentication status to true
        })
        .catch(error => {
          console.error('Failed to fetch user:', error); // Log error if fetching fails
          setUser(null); // Reset user state
          setIsAuthenticated(false); // Reset authentication status
        });
    }
  }, []);

  // Function to handle login
  const login = async (email, password) => {
    try {
      const { token, user: fetchedUser } = await loginService(email, password); // Call login service with email and password
      localStorage.setItem('authToken', token); // Store the token in local storage
      setUser(fetchedUser); // Set the fetched user in state
      setIsAuthenticated(true); // Set authentication status to true
      return fetchedUser; // Return the user object
    } catch (error) {
      console.error('Login failed:', error); // Log error if login fails
      setIsAuthenticated(false); // Set authentication status to false
      throw error; // Rethrow the error for further handling
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('authToken'); // Remove the token from local storage
    setUser(null); // Reset user state
    setIsAuthenticated(false); // Set authentication status to false
  };

  // Function to check if the user has a specific role
  const isRole = (role) => {
    return user && user.role === role; // Check if the user's role matches the specified role
  };

  // Provide the user, authentication status, and auth functions to the entire app
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider'); // Ensure useAuth is used within AuthProvider
  }
  return context; // Return the context value
};
