const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    // Payment method (e.g. credit card, bank transfer, etc.)
    paymentMethod: {
      type: String,
      required: true
    },
  
    // Payment amount
    amount: {
      type: Number,
      required: true
    },
  
    // Currency of the payment
    currency: {
      type: String,
      required: true
    },
  
    // Payment status (e.g. pending, success, failed, etc.)
    status: {
      type: String,
      required: true,
      default: 'pending'
    },
  
    // Payment date
    paymentDate: {
      type: Date,
      default: Date.now
    },
  
    // User who made the payment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  
    // Payment metadata (e.g. transaction ID, payment gateway response, etc.)
    metadata: {
      type: Object
    }
  });
  
  module.exports = mongoose.model('Payment', paymentSchema);