import axios from 'axios';

// Function to retrieve token from localStorage
const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token || null; // Simplified conditional
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
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
apiClient.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Interceptor for handling responses and errors
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      console.error('Token expired or invalid');
      window.location.href = '/login';
    } else {
      console.error('Response error:', error);
    }
    return Promise.reject(error);
  }
);

// API request functions
export const createPassportApplication = (applicationData) => apiClient.post('/users/applications/new', applicationData);

export const getUserProfile = () => apiClient.get('/users/myprofile');

export const updateUserProfile = (data) => apiClient.post('/users/update-profile', data);
