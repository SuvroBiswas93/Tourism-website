import React from 'react';
import ContactForm from '../components/ContactForm';
import CustomerReviews from '../components/CustomerReviews';

export default function Contact() {
  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-x-hidden">
          <ContactForm />
          <CustomerReviews />
        </div>
      </div>
    </div>
  );
}