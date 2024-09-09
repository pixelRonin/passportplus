// src/services/UserPayment.js
import apiClient from './api'; // Adjust the path accordingly

/**
 * Creates a payment intent by sending a request to the backend.
 * @param {string} serviceType - The type of service (e.g., 'normal', 'fastTrack').
 * @returns {Promise<object>} - The response data containing the client secret.
 * @throws {Error} - Throws error if the request fails.
 */
export const createPaymentIntent = async (serviceType) => {
  try {
    const response = await apiClient.post('/payment/create-payment-intent', { serviceType });
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

/**
 * Records a payment by sending payment details to the backend.
 * @param {string} paymentId - The ID of the payment.
 * @param {string} serviceType - The type of service (e.g., 'normal', 'fastTrack').
 * @param {number} amount - The amount of the payment in cents.
 * @returns {Promise<object>} - The response data.
 * @throws {Error} - Throws error if the request fails.
 */
export const recordPayment = async (paymentId, serviceType, amount) => {
  try {
    const response = await apiClient.post('/payment/record-payment', { paymentId, serviceType, amount });
    return response.data;
  } catch (error) {
    console.error('Error recording payment:', error);
    throw error;
  }
};
