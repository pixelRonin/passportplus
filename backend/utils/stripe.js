// Importing .env file for environment variables
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Ensure you have set your STRIPE_SECRET_KEY in the .env file

module.exports = stripe;
