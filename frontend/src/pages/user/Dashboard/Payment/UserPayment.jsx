import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent, recordPayment } from '../../../../services/paymentService'; // Adjust path accordingly

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [serviceType, setServiceType] = useState('normal');

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const { clientSecret } = await createPaymentIntent(serviceType);
        setClientSecret(clientSecret);
      } catch (err) {
        setError('Failed to initialize payment. Please try again.');
      }
    };

    initializePayment();
  }, [serviceType]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setSuccess('Payment succeeded!');

        try {
          await recordPayment(paymentIntent.id, serviceType, serviceType === 'normal' ? 10000 : 30000);
          console.log('Payment recorded successfully');
        } catch (recordError) {
          setError('Failed to record payment. Please try again.');
        }
      }
    } catch (err) {
      setError('Failed to process payment. Please try again.');
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Complete Your Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 mb-4">Choose your processing fee:</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setServiceType('normal')}
              className={`flex-1 p-4 border rounded-lg shadow-sm transition-colors duration-300 ${
                serviceType === 'normal' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-800">Normal Lodgment</h3>
              <p className="text-gray-500">K100.00</p>
            </button>
            <button
              type="button"
              onClick={() => setServiceType('fastTrack')}
              className={`flex-1 p-4 border rounded-lg shadow-sm transition-colors duration-300 ${
                serviceType === 'fastTrack' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-800">Fast Track</h3>
              <p className="text-gray-500">K300.00</p>
            </button>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <CardElement className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className={`w-full py-3 mt-4 font-semibold text-white rounded-lg shadow-md ${
            !stripe ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } transition duration-300`}
        >
          {stripe ? 'Pay Now' : 'Loading...'}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
      </form>
    </div>
  );
};

export default PaymentPage;
