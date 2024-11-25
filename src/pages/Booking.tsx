import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import LocalInsights from '../components/LocalInsights';
import Map from '../components/Map';
import SustainabilityTracker from '../components/SustainabilityTracker';
import EcoFriendlyBadge from '../components/EcoFriendlyBadge';
import PaymentForm from '../components/PaymentForm';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = useSelector((state: RootState) => 
    state.destinations.items.find(d => d.id === id)
  );
  const [showPayment, setShowPayment] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  if (!destination) {
    return (
      <div className="pt-20 pb-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Destination not found</h1>
        <button
          onClick={() => navigate('/destinations')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Return to destinations
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setBookingComplete(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const calculateTotalPrice = () => {
    if (!formData.checkIn || !formData.checkOut) return destination.price;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return destination.price * nights;
  };

  const ecoFeatures = [
    'Solar-powered facilities',
    'Water conservation system',
    'Local ingredient sourcing',
    'Waste recycling program',
    'Energy-efficient lighting'
  ];

  if (bookingComplete) {
    return (
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="animate-bounce mb-6">
              <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for booking with us. You will receive a confirmation email shortly.
            </p>
            <p className="text-gray-500">Redirecting to homepage...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{destination.name}</h1>
                <p className="text-gray-600 mb-6">{destination.description}</p>
                
                {!showPayment ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-in Date
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.checkIn}
                          onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-out Date
                        </label>
                        <input
                          type="date"
                          required
                          min={formData.checkIn || new Date().toISOString().split('T')[0]}
                          value={formData.checkOut}
                          onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          ${calculateTotalPrice()}
                        </span>
                        <span className="text-gray-500"> total</span>
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  </form>
                ) : (
                  <PaymentForm
                    amount={calculateTotalPrice()}
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setShowPayment(false)}
                  />
                )}
              </div>
            </div>

            <div className="mt-8">
              <SustainabilityTracker />
            </div>

            <div className="mt-8">
              <Map location={destination.name} />
            </div>
          </div>

          <div className="space-y-8">
            <EcoFriendlyBadge score={8.5} features={ecoFeatures} />
            <LocalInsights destination={destination} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;