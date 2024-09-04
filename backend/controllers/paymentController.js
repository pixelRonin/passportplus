const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/paymentsModel'); // Import your Mongoose model
const User = require('../models/usersModel'); // Import your User model

const exchangeRate = 0.3; // Example exchange rate (1 USD = 0.3 K)

exports.createPaymentIntent = async (req, res) => {
  try {
    const { serviceType, userObjectId } = req.body;

    // Define fees in Kina
    const feesInKina = {
      normal: 100, // K100.00
      fastTrack: 200 // K200.00
    };

    // Check if serviceType is valid
    if (!feesInKina[serviceType]) {
      return res.status(400).json({ error: 'Invalid service type' });
    }

    // Fetch user from database using userObjectId
    const user = await UserModel.findById(userObjectId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Convert fees to USD
    const amountInUSD = Math.round(feesInKina[serviceType] * (1 / exchangeRate) * 100); // Amount in cents

    // Create payment intent with userObjectId in metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInUSD, // Amount in cents
      currency: 'usd', // Currency code
      description: `Payment for ${serviceType} service`, // Optional description
      metadata: {
        userObjectId, // Attach userObjectId to metadata
        serviceType // Optionally attach serviceType for further reference
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Error creating payment intent: ' + error.message });
  }
};
exports.recordPayment = async (req, res) => {
  try {
    const { paymentIntentId, serviceType, amountInKina, userId } = req.body;

    if (!paymentIntentId || !serviceType || !amountInKina || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Record payment details in MongoDB
    const payment = new Payment({
      paymentIntentId,
      serviceType,
      amount: amountInKina,
      currency: 'KINA', // Assuming you're using Kina as a custom currency label
      status: 'succeeded', // This should be updated based on actual payment result
      user: user._id, // Set user reference
      paymentDate: new Date(), // Optionally set the payment date
    });

    await payment.save();

    res.status(200).json({ message: 'Payment recorded successfully' });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({ error: 'Error recording payment: ' + error.message });
  }
};
