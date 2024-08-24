// paymentController.js
const Payment = require('../models/paymentsModel');
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
// Importing .env file for environment variables
require('dotenv').config();

const makePayment = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!req.body.paymentMethod || !req.body.amount || !req.body.currency) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const payment = new Payment({
      paymentMethod: req.body.paymentMethod,
      amount: req.body.amount,
      currency: req.body.currency,
      user: user._id
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    console.error('makePayment: error:', err);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

const getPayments = async (req, res) => {
  try {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // extract the user ID from the JWT payload

    const payments = await Payment.find({ user: userId }).populate('user');
    if (!payments) {
      return res.status(404).json({ error: 'No payments found' });
    }
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve payments' });
  }
};

const getPayment = async (req, res) => {
  try {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // extract the user ID from the JWT payload

    if (!req.params.id) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const payment = await Payment.findById(req.params.id).populate('user');
    if (!payment || payment.user.toString() !== userId) {
      return res.status(404).json({ error: 'Payment not found or not authorized' });
    }
    res.json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve payment' });
  }
};

module.exports = {
  makePayment,
  getPayments,
  getPayment
}