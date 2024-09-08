import api from './api';

// Function to upload files
const uploadFiles = async (formData) => {
    try {
        const response = await api.post('/upload/file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Ensures that files are sent properly
            }
        });
        return response.data; // Return the response data from the server
    } catch (error) {
        // Handle error cases and throw an error message
        if (error.response) {
            // Server responded with a status other than 200 range
            throw new Error(error.response.data.message || 'Error uploading files');
        } else if (error.request) {
            // No response received from the server
            throw new Error('No response received from the server');
        } else {
            // Other errors
            throw new Error('Error uploading files');
        }
    }
};

export default uploadFiles;
