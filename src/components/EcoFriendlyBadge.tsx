import React from 'react';
import { Leaf } from 'lucide-react';

interface Props {
  score: number;
  features: string[];
}

export default function EcoFriendlyBadge({ score, features }: Props) {
  const getScoreColor = () => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Leaf className="h-6 w-6 text-green-500" />
        <h3 className="text-xl font-bold text-gray-900">Sustainability Score</h3>
      </div>

      <div className={`inline-flex items-center px-3 py-1 rounded-full ${getScoreColor()} mb-4`}>
        <span className="font-semibold">{score}/10</span>
      </div>

      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-green-500" />
            <span className="text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}