// src/services/PaymentService.js

import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Function to create a payment intent
export const createPaymentIntent = async (serviceType, userId) => {
  try {
    const response = await axios.post(`${apiUrl}/payments/create-payment-intent`, {
      serviceType,
      userId
    });
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Function to record a payment
export const recordPayment = async (paymentIntentId, serviceType, amountInKina, userId) => {
  try {
    await axios.post(`${apiUrl}/payments/record-payment`, {
      paymentIntentId,
      serviceType,
      amountInKina,
      userId
    });
  } catch (error) {
    console.error('Error recording payment:', error);
    throw error;
  }
};
