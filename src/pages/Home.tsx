import React from 'react';
import Hero from '../components/Hero';
import FeaturedDestinations from '../components/FeaturedDestinations';
import CustomerReviews from '../components/CustomerReviews';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDestinations />
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <CustomerReviews />
        </div>
      </div>
    </>
  );
}