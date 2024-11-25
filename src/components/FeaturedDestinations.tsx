import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import DestinationCard from './DestinationCard';

export default function FeaturedDestinations() {
  const destinations = useSelector((state: RootState) => state.destinations.items);
  const featuredDestinations = destinations.slice(0, 6); // Show only first 6 destinations

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of stunning locations around the world
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}