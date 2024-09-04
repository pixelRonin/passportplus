import axios from 'axios';

// Function to retrieve token from localStorage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

// Create an instance of axios with default settings
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken(); // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Interceptor for handling responses and errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Token expired or invalid');
      // Optionally handle token refresh or redirect to login
      window.location.href = '/login'; // Adjust the path as needed
    }
    return Promise.reject(error);
  }
);

// Admin API request functions
export const getAdminProfile = () => apiClient.get('/admins/admin-profile');
export const updateAdminProfile = (data) => apiClient.post('/admins/update-profile', data);
export const getAllUsers = () => apiClient.get('/admins/users'); // Get a list of all users
export const deleteUser = (userId) => apiClient.delete(`/admins/users/${userId}`); // Delete a specific user by ID
export const createUser = (data) => apiClient.post('/admins/users', data); // Create a new user
export const getUserDetails = (userId) => apiClient.get(`/admins/users/${userId}`); // Get details of a specific user by ID
