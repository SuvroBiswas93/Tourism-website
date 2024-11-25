import React from 'react';
import type { Destination } from '../types';
import DestinationCard from './DestinationCard';

interface Props {
  destinations: Destination[];
  searchQuery: string;
}

export default function SearchResults({ destinations, searchQuery }: Props) {
  if (destinations.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          No results found for "{searchQuery}"
        </h2>
        <p className="text-gray-600">
          Try adjusting your search terms or browse our featured destinations below.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} destination={destination} />
      ))}
    </div>
  );
}