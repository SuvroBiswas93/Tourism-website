import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import type { Destination } from '../types';

interface Props {
  destination: Destination;
}

export default function DestinationCard({ destination }: Props) {
  const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/booking/${destination.id}`)}
    className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-md">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{destination.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">{destination.location}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">${destination.price}</span>
            <span className="text-gray-500">/night</span>
          </div>
          <button
            onClick={() => navigate(`/booking/${destination.id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book NOW
          </button>
        </div>
      </div>
    </div>
  );
}