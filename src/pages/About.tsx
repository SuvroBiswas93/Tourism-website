import React from 'react';
import { Globe2, Users2, Shield, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Wanderlust</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about creating unforgettable travel experiences and helping you discover the world's most beautiful destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: Globe2,
              title: 'Global Reach',
              description: 'Access to destinations worldwide',
            },
            {
              icon: Users2,
              title: 'Expert Team',
              description: 'Professional travel consultants',
            },
            {
              icon: Shield,
              title: 'Secure Booking',
              description: 'Safe and protected transactions',
            },
            {
              icon: Award,
              title: 'Best Prices',
              description: 'Competitive rates guaranteed',
            },
          ].map((feature, index) => (
            <div key={index} className=" animate-fadeInLeft transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-200 text-center p-6 bg-white rounded-lg shadow-md">
              <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded with a vision to make world-class travel experiences accessible to everyone, 
            Wanderlust has grown to become a leading name in the tourism industry. Our commitment 
            to excellence and customer satisfaction has earned us the trust of travelers worldwide.
          </p>
          <p className="text-gray-600">
            We believe that travel has the power to transform lives, broaden perspectives, and create 
            lasting memories. That's why we work tirelessly to curate the best destinations and 
            experiences for our clients, ensuring every journey with us is nothing short of extraordinary.
          </p>
        </div>
      </div>
    </div>
  );
}