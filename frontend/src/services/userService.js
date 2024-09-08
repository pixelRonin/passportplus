// src/services/userServices.js
import apiClient from './api'; // Adjust the path based on your file structure

// Define user-related services
const userServices = {
  getUserProfile: async () => {
    try {
      const response = await apiClient.get('/user/myprofile');
      console.info('User profile retrieved successfully');
      return response; // Return the full response object
    } catch (error) {
      console.error('Error retrieving user profile:', error); // Log the full error object
      throw error; // Throw error to be caught by the calling function
    }
  },

  updateUserProfile: async (data) => {
    try {
      const response = await apiClient.patch('/user/update-profile', data);
      console.info('User profile updated successfully'); 
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error); 
      throw error;
    }
  },
};

export default userServices;
