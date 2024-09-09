// src/routes/payment.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController'); // Adjust the path as needed
const authenticateToken = require('../middleware/authMiddleware')

// Route to create a payment intent
router.post('/create-payment-intent', authenticateToken, paymentController.createPaymentIntent);

// Route to record a payment
router.post('/record-payment', authenticateToken, paymentController.recordPayment);

module.exports = router;
