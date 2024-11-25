import React from 'react';
import { Phone, Shield, CloudSun, Calendar } from 'lucide-react';
import type { Destination } from '../types';

interface Props {
  destination: Destination;
}

export default function LocalInsights({ destination }: Props) {
  // Simulated real-time data (in a real app, this would come from APIs)
  const weather = {
    temp: Math.floor(Math.random() * (30 - 15) + 15),
    condition: ['Sunny', 'Partly Cloudy', 'Clear'][Math.floor(Math.random() * 3)],
  };

  const events = [
    'Local Food Festival',
    'Cultural Exhibition',
    'Music Concert',
    'Art Gallery Opening',
  ][Math.floor(Math.random() * 4)];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Insights</h3>

      {/* Weather */}
      <div className="flex items-start gap-4">
        <CloudSun className="h-6 w-6 text-blue-500 mt-1" />
        <div>
          <h4 className="font-semibold text-gray-900">Current Weather</h4>
          <p className="text-gray-600">
            {weather.temp}°C - {weather.condition}
          </p>
        </div>
      </div>

      {/* Events */}
      <div className="flex items-start gap-4">
        <Calendar className="h-6 w-6 text-blue-500 mt-1" />
        <div>
          <h4 className="font-semibold text-gray-900">Upcoming Event</h4>
          <p className="text-gray-600">{events}</p>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="flex items-start gap-4">
        <Shield className="h-6 w-6 text-blue-500 mt-1" />
        <div>
          <h4 className="font-semibold text-gray-900">Safety Tips</h4>
          <ul className="text-gray-600 list-disc list-inside space-y-1">
            <li>Keep important documents secure</li>
            <li>Stay aware of your surroundings</li>
            <li>Follow local health guidelines</li>
            <li>Keep emergency contacts handy</li>
          </ul>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="flex items-start gap-4">
        <Phone className="h-6 w-6 text-blue-500 mt-1" />
        <div>
          <h4 className="font-semibold text-gray-900">Emergency Contacts</h4>
          <ul className="text-gray-600 space-y-1">
            <li>Police: 911</li>
            <li>Tourist Police: +1-555-0123</li>
            <li>Medical Emergency: +1-555-0124</li>
            <li>Embassy: +1-555-0125</li>
          </ul>
        </div>
      </div>
    </div>
  );
}