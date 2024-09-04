const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    // Payment method (e.g., credit card, bank transfer, etc.)
    paymentMethod: {
      type: String,
      required: true,
      enum: ['card', 'bank_transfer', 'other'] // Adjust based on your needs
    },
  
    // Payment amount in Kina
    amountInKina: {
      type: Number,
      required: true
    },

    // Payment amount in USD (if needed for records)
    amountInUSD: {
      type: Number
    },
  
    // Currency of the payment
    currency: {
      type: String,
      required: true,
      default: 'usd' // Default currency
    },
  
    // Payment status (e.g., pending, success, failed, etc.)
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
  
    // Stripe payment intent ID
    paymentIntentId: {
      type: String
    },

    // Service type (e.g., normal or fastTrack)
    serviceType: {
      type: String,
      enum: ['normal', 'fastTrack'],
      required: true
    },

    // Metadata for additional information
    metadata: {
      type: Object
    }
  });
  
module.exports = mongoose.model('Payment', paymentSchema);
