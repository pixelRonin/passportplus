import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent, recordPayment } from '../../../../services/PaymentService'; // Adjust path accordingly

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // Replace this with your actual method to get user ID
        const mockUserId = 'yourUserObjectIdHere'; // Mock user ID for demonstration
        setUserId(mockUserId);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to load user data. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm userId={userId} />
    </Elements>
  );
};

const PaymentForm = ({ userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [serviceType, setServiceType] = useState('normal'); // Default service type

  useEffect(() => {
    if (!userId) {
      setError('User ID is required.');
      return;
    }

    createPaymentIntent(serviceType, userId)
      .then(data => setClientSecret(data.clientSecret))
      .catch(err => {
        console.error('Error fetching client secret:', err);
        setError('Failed to initialize payment. Please try again.');
      });
  }, [serviceType, userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });

      if (error) {
        setError(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setSuccess('Payment succeeded!');

        try {
          await recordPayment(paymentIntent.id, serviceType, serviceType === 'normal' ? 100 : 200, userId);
          console.log('Payment recorded successfully');
        } catch (recordError) {
          console.error('Error recording payment:', recordError);
          setError('Failed to record payment. Please try again.');
        }
      }
    } catch (err) {
      console.error('Error confirming card payment:', err);
      setError('Failed to process payment. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center mb-4">
          <input 
            type="radio" 
            value="normal" 
            id="normal" 
            checked={serviceType === 'normal'} 
            onChange={() => setServiceType('normal')} 
            className="mr-2"
          />
          <label htmlFor="normal" className="text-gray-700">Normal Lodgment (K100.00)</label>
        </div>
        <div className="flex items-center mb-4">
          <input 
            type="radio" 
            value="fastTrack" 
            id="fastTrack" 
            checked={serviceType === 'fastTrack'} 
            onChange={() => setServiceType('fastTrack')} 
            className="mr-2"
          />
          <label htmlFor="fastTrack" className="text-gray-700">Fast Track (K200.00)</label>
        </div>
        <div className="mb-4">
          <CardElement className="p-2 border border-gray-300 rounded-md" />
        </div>
        <button 
          type="submit" 
          disabled={!stripe} 
          className={`bg-blue-500 text-white px-4 py-2 rounded-md transition-colors duration-300 ${!stripe ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          Pay
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
    </div>
  );
};

export default PaymentPage;
