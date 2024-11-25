import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import { config } from '../config';

const stripePromise = loadStripe(config.stripePublishableKey);

interface Props {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentForm({ amount, onSuccess, onCancel }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      // Create payment method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: {
          number: cardDetails.number,
          exp_month: parseInt(cardDetails.expiry.split('/')[0]),
          exp_year: parseInt(cardDetails.expiry.split('/')[1]),
          cvc: cardDetails.cvc,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!paymentMethod) {
        throw new Error('Payment failed');
      }

      // In a real application, you would send the paymentMethod.id to your server
      // to complete the payment. This is a simplified example.
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    setCardDetails(prev => ({ ...prev, expiry: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Payment Details</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              maxLength={16}
              value={cardDetails.number}
              onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value.replace(/\D/g, '') }))}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                maxLength={5}
                value={cardDetails.expiry}
                onChange={handleExpiryChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="MM/YY"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVC
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                maxLength={3}
                value={cardDetails.cvc}
                onChange={(e) => setCardDetails(prev => ({ ...prev, cvc: e.target.value.replace(/\D/g, '') }))}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">
              Total: ${amount}
            </p>
            <p className="text-sm text-gray-500">
              Secure payment powered by Stripe
            </p>
          </div>
          <div className="space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg ${
                isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              } transition-colors`}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Processing...
                </div>
              ) : (
                'Pay Now'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}