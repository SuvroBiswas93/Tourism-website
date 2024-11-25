import React, { useState } from 'react';
import { Leaf, Plane, Train, Bus, Car } from 'lucide-react';

interface TransportEmissions {
  plane: number;
  train: number;
  bus: number;
  car: number;
}

export default function SustainabilityTracker() {
  const [distance, setDistance] = useState<number>(0);
  const [selectedMode, setSelectedMode] = useState<keyof TransportEmissions>('plane');

  const emissionsPerKm: TransportEmissions = {
    plane: 0.255,  // kg CO2 per passenger km
    train: 0.041,
    bus: 0.082,
    car: 0.171,
  };

  const calculateEmissions = (mode: keyof TransportEmissions) => {
    return (distance * emissionsPerKm[mode]).toFixed(2);
  };

  const getAlternativeSavings = () => {
    if (selectedMode === 'plane') {
      return {
        train: (distance * (emissionsPerKm.plane - emissionsPerKm.train)).toFixed(2),
        bus: (distance * (emissionsPerKm.plane - emissionsPerKm.bus)).toFixed(2),
      };
    }
    return null;
  };

  const savings = getAlternativeSavings();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Leaf className="h-6 w-6 text-green-500" />
        <h3 className="text-2xl font-bold text-gray-900">Carbon Footprint Calculator</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Travel Distance (km)
          </label>
          <input
            type="number"
            min="0"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mode of Transport
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(emissionsPerKm).map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode as keyof TransportEmissions)}
                className={`p-4 rounded-lg border ${
                  selectedMode === mode
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-500'
                } transition-colors`}
              >
                {mode === 'plane' && <Plane className="h-6 w-6 mx-auto mb-2" />}
                {mode === 'train' && <Train className="h-6 w-6 mx-auto mb-2" />}
                {mode === 'bus' && <Bus className="h-6 w-6 mx-auto mb-2" />}
                {mode === 'car' && <Car className="h-6 w-6 mx-auto mb-2" />}
                <span className="block text-sm capitalize">{mode}</span>
              </button>
            ))}
          </div>
        </div>

        {distance > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-2">Carbon Footprint</h4>
            <p className="text-gray-600">
              Your journey will produce approximately{' '}
              <span className="font-bold text-gray-900">
                {calculateEmissions(selectedMode)} kg
              </span>{' '}
              of CO2.
            </p>

            {savings && (
              <div className="mt-4">
                <h4 className="font-semibold text-lg mb-2">Greener Alternatives</h4>
                <ul className="space-y-2">
                  <li className="text-gray-600">
                    🚂 Taking the train would save{' '}
                    <span className="font-bold text-green-600">{savings.train} kg</span> of CO2
                  </li>
                  <li className="text-gray-600">
                    🚌 Taking the bus would save{' '}
                    <span className="font-bold text-green-600">{savings.bus} kg</span> of CO2
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}