// src/models/paymentsModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  amount: { 
    type: Number,
    required: true 
  },
  currency: { 
    type: String, 
    required: true 
  },
  paymentIntentId: { 
    type: String, 
    required: false
  },
  paymentMethodId: { 
    type: String, 
    required: false 
  },
  status: { 
    type: String, 
    required: true 
  },
  receiptUrl: { 
    type: String, 
    required: false 
  },
  metadata: { 
    type: Map, 
    of: String, 
    required: false 
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: false
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
