// paymentRoute.js
const express = require('express');
const router = express.Router();

// Importing  the payment controller and middleware
const paymentController = require('../controllers/paymentController');
const paymentMiddleware = require('../middleware/paymentMiddleware');

router.post('/make-payment',  paymentMiddleware, paymentController.makePayment);

router.get('/view-payments', paymentController.getPayments);
router.get('/:id', paymentController.getPayment);

module.exports = router;