import apiClient from "./api";

const passportService = {

    createPassportApplication: async (applicationData) => {
        try {
          const response = await apiClient.post('/passport/new', applicationData);
          console.info('Passport application created successfully');
          return response.data;
        } catch (error) {
          console.error('Error creating passport application:', error);
          throw error;
        }
      },
}

export default passportService;