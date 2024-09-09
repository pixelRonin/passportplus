const Payment = require('../models/paymentsModel');
const User = require('../models/usersModel'); // Import the User model if needed for additional operations
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

require('dotenv').config();

const createPaymentIntent = async (req, res) => {
  try {
    const { serviceType } = req.body;
    
    // Amount in Papua New Guinean Kina (PGK) converted to cents
    const amount = serviceType === 'normal' ? 10000 : 30000; // Amount in cents (PGK 100.00 or PGK 200.00)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'pgk', // Set currency to Papua New Guinean Kina (PGK)
      metadata: { integration_check: 'accept_a_payment' },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

const recordPayment = async (req, res) => {
  try {
    const { paymentId, serviceType, amount } = req.body;

    // Ensure req.user is available and contains an _id field
    if (!req.user) {
      return res.status(400).json({ error: 'User information is required' });
    }

    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    console.log('Payment Intent:', paymentIntent); // Log for debugging

    // Check if paymentIntent has charges
    const charges = paymentIntent.charges && paymentIntent.charges.data;
    const receiptUrl = charges && charges.length > 0 ? charges[0].receipt_url : null;

    // Prepare the payment data to save
    const paymentData = {
      amount,
      currency: paymentIntent.currency,
      paymentIntentId: paymentIntent.id,
      paymentMethodId: paymentIntent.payment_method,
      status: paymentIntent.status,
      receiptUrl,
      metadata: paymentIntent.metadata,
      user: req.user._id
    };

    // Create a new payment record
    const payment = new Payment(paymentData);
    await payment.save();

    res.status(201).json({ message: 'Payment recorded successfully' });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({ error: 'Failed to record payment' });
  }
};

module.exports  = { 
  createPaymentIntent,
  recordPayment 
};

