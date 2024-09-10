import apiClient from './api'; // Import the base API client

/**
 * Search users based on name or email.
 * @param {string} query - The search query.
 * @returns {Promise<object>} - The API response data.
 */
export const searchUser = async (query) => {
  try {
    const response = await apiClient.get('/admin/search-user', {
      params: { query },
    });
    return response.data; // Return data from the response
  } catch (error) {
    console.error('Error searching for users:', error);
    throw error; // Rethrow to be handled by the caller
  }
};

/**
 * Assign the Commissioner of Oath role to a user.
 * @param {string} userId - The ID of the user to be assigned.
 * @returns {Promise<object>} - The API response data.
 */
export const addCommissioner = async (userId) => {
  try {
    const response = await apiClient.post('/admin/add-commissioner', {
      userId,
    });
    return response.data; // Return data from the response
  } catch (error) {
    console.error('Error adding Commissioner of Oath:', error);
    throw error; // Rethrow to be handled by the caller
  }
};
