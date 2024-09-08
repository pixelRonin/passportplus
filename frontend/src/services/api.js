// src/api/api.js
import axios from 'axios';

// Function to retrieve token from localStorage
const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token || null; // Simplified conditional
  } catch (error) {
    console.error('Error parsing user data:', error);
    throw error; // Rethrow the error to handle it properly
  }
};

// Create an instance of axios with default settings
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Use environment variable or default value
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding the Authorization header
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        console.error('No token available. Authentication required.');
        // Consider redirecting to login page or handling authentication
      }
      return config;
    } catch (error) {
      console.error('Error getting token:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor for handling responses and errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorCode = error.response?.status;
    const errorMessage = error.response?.data?.error || error.message;

    switch (errorCode) {
      case 401:
        console.error('Token expired or invalid');
        window.location.href = '/login';
        break;
      case 404:
        console.error('Resource not found:', errorMessage);
        break;
      case 500:
        console.error('Internal server error:', errorMessage);
        break;
      default:
        console.error('Unknown error:', errorMessage);
    }

    return Promise.reject(error);
  }
);

// Consider adding a more comprehensive error handling mechanism
apiClient.interceptors.response.use(undefined, (error) => {
  console.error('Unhandled error:', error);
  // Handle or log the error accordingly
  return Promise.reject(error);
});

export default apiClient;