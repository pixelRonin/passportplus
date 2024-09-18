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

  getPassportApplication: async (userId) => {
    try {
      const response = await apiClient.get(`/user/passport-application/${userId}`);
      console.info('Passport application data retrieved successfully');
      return response.data; // Return just the data part of the response
    } catch (error) {
      console.error('Error retrieving passport application data:', error);
      throw error;
    }
  },

  // Assign a commissioner to a passport application
  assignCommissioner: async (applicationId, commissionerId) => {
    try {
      const response = await apiClient.post(`/passport-application/${applicationId}`, {
        commissionerId,
      });
      console.info('Commissioner assigned successfully');
      return response.data; // Return just the data part of the response
    } catch (error) {
      console.error('Error assigning commissioner:', error);
      throw error;
    }
  },

  // Search for commissioners
  searchCommissioners: async (searchQuery) => {
    try {
      console.log('Searching for commissioners with query:', searchQuery);
      const response = await apiClient.get('user/search-commissioner', { params: { search: searchQuery } });
      console.log('API response for searching commissioners:', response.data);
  
      // Assuming the response.data is an array of commissioner objects
      return response.data; // Adjust if needed based on actual response
    } catch (error) {
      console.error('Error searching for commissioners:', error.message, error.response ? error.response.data : error);
      throw error;
    }
  },  
};


export default userServices;
