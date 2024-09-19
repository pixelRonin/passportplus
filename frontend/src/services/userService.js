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
assignCommissioner: async (userObjectId, commissionerName) => {
  console.log('assignedCommissioner')
  try {
    console.log('Starting to assign commissioner...');
    console.log('userObjectId:', userObjectId);
    console.log('commissionerName:', commissionerName);

    // Step 1: Fetch the passport application using the userObjectId
    const applicationResponse = await apiClient.get(`/user/passport-application/${userObjectId}`);
    console.log('applicationResponse:', applicationResponse);
    
    // Extract passport application data
    const passportApplication = applicationResponse.data?.passportApplication;
    console.log('passportApplication:', passportApplication);

    if (!passportApplication || !passportApplication._id) {
      throw new Error('Passport application not found');
    }
    
    // Extract passportId
    const passportId = passportApplication._id;
    console.log('Extracted passportId:', passportId);
    
    // Step 2: Call the API endpoint to assign the commissioner by name
    const response = await apiClient.post('/user/assign-commissioner', {
      passportId, // Use the fetched passportId
      commissionerName, // Pass the commissioner name
    });
    console.log('API response:', response);
    
    console.info('Commissioner assigned successfully');
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error assigning commissioner:', error.message);
    console.error('Full error details:', error);
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
  
  getUsersAssignedToCommissioner: async (commissionerId) => {
    try {
      const response = await apiClient.get(`/user/get-commissioner-tasks/${commissionerId}`);
      console.info('Commissioned data retrieved successfully');
      return response.data; // Return just the data part of the response
    } catch (error) {
      console.error('Error retrieving commissioner tasks:', error);
      throw error;
    }
  }
};


export default userServices;
