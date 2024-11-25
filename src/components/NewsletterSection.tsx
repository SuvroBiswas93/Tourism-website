import React, { useState } from 'react';
import { Mail, CheckCircle, XCircle } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setMessage('Thank you for subscribing to our newsletter!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Stay updated with our latest travel deals, destination guides, and sustainable tourism tips.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>

          {status !== 'idle' && (
            <div className={`mt-4 flex items-center justify-center gap-2 ${
              status === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {status === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <span className="text-white">{message}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;