const Payment = require('../models/paymentsModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

require('dotenv').config();

// Function to create a payment intent
const createPaymentIntent = async (req, res) => {
  try {
    const { serviceType } = req.body;

    // Determine amount based on service type
    const amountInKina = serviceType === 'normal' ? 100.00 : 300.00; // K100.00 or K300.00
    const amountInCents = amountInKina * 100; // Convert to cents for Stripe

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'pgk', // Use Papua New Guinean Kina (PGK)
      metadata: { integration_check: 'accept_a_payment' },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

// Function to record a payment in the database
const recordPayment = async (req, res) => {
  try {
    const { paymentId, serviceType, amount } = req.body;

    // Check that the user is authenticated and has an ID
    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: 'User information is required' });
    }

    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    if (!paymentIntent) {
      return res.status(404).json({ error: 'Payment Intent not found' });
    }

    console.log('Payment Intent:', paymentIntent); // Debugging log

    // Extract receipt URL from payment intent charges
    const charges = paymentIntent.charges && paymentIntent.charges.data;
    const receiptUrl = charges && charges.length > 0 ? charges[0].receipt_url : null;

    // Convert the amount back to Kina for storage
    const amountInKina = amount / 100; // Convert cents back to Kina

    // Prepare the payment data to save
    const paymentData = {
      amount: amountInKina, // Save the amount in Kina
      currency: paymentIntent.currency,
      paymentIntentId: paymentIntent.id,
      paymentMethodId: paymentIntent.payment_method,
      status: paymentIntent.status,
      receiptUrl,
      metadata: paymentIntent.metadata,
      user: req.user._id // Associate payment with user
    };

    // Save payment to the database
    const payment = new Payment(paymentData);
    await payment.save();

    res.status(201).json({ message: 'Payment recorded successfully' });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({ error: 'Failed to record payment' });
  }
};

module.exports = { 
  createPaymentIntent,
  recordPayment 
};
