import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Destination } from '../types';

interface DestinationsState {
  items: Destination[];
  loading: boolean;
  error: string | null;
}

const initialState: DestinationsState = {
  items: [
    {
      id: '1',
      name: 'Santorini Sunset Villa',
      description: 'Experience the magic of Santorini\'s famous sunsets from your private villa, featuring infinity pools and traditional Cycladic architecture.',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=2000',
      rating: 4.9,
      price: 299,
      location: 'Santorini, Greece'
    },
    {
      id: '2',
      name: 'Bali Beachfront Resort',
      description: 'Luxury meets paradise in this stunning beachfront property with private beach access and traditional Balinese spa.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000',
      rating: 4.8,
      price: 199,
      location: 'Bali, Indonesia'
    },
    {
      id: '3',
      name: 'Swiss Alpine Retreat',
      description: 'A cozy mountain hideaway with breathtaking views of the Alps, perfect for both summer hiking and winter skiing.',
      image: 'https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&q=80&w=2000',
      rating: 4.7,
      price: 349,
      location: 'Zermatt, Switzerland'
    },
    {
      id: '4',
      name: 'Maldives Water Villa',
      description: 'Overwater luxury villa with glass floors, private infinity pool, and direct access to crystal-clear waters.',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=2000',
      rating: 4.9,
      price: 599,
      location: 'Malé, Maldives'
    },
    {
      id: '5',
      name: 'Dubai Sky Penthouse',
      description: 'Ultra-luxury penthouse in the heart of Dubai with panoramic city views and private helipad access.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000',
      rating: 4.8,
      price: 899,
      location: 'Dubai, UAE'
    },
    {
      id: '6',
      name: 'Kyoto Traditional House',
      description: 'Authentic Japanese machiya with zen garden, tea room, and modern amenities in historic Gion district.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000',
      rating: 4.7,
      price: 279,
      location: 'Kyoto, Japan'
    },
    {
      id: '7',
      name: 'Amalfi Coast Villa',
      description: 'Cliffside villa with terraced gardens, infinity pool, and stunning views of the Mediterranean Sea.',
      image: 'https://cdn.lecollectionist.com/__collectionist__/production/uploads/photos/41071/84ea8690-8a8b-4ad2-ae38-6f9f08ea9f53.jpg?width=1984&q=65',
      rating: 4.8,
      price: 459,
      location: 'Amalfi, Italy'
    },
    {
      id: '8',
      name: 'African Safari Lodge',
      description: 'Luxury tented camp with private game drives and spectacular views of the Serengeti plains.',
      image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=2000',
      rating: 4.9,
      price: 699,
      location: 'Serengeti, Tanzania'
    },
    {
      id: '9',
      name: 'Machu Picchu Retreat',
      description: 'Boutique hotel with direct views of the ancient citadel and access to private Inca Trail tours.',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=2000',
      rating: 4.6,
      price: 329,
      location: 'Cusco, Peru'
    },
    {
      id: '10',
      name: 'Great Barrier Reef Resort',
      description: 'Eco-luxury resort with private beach, diving center, and direct access to the Great Barrier Reef.',
      image: 'https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&q=80&w=2000',
      rating: 4.7,
      price: 429,
      location: 'Queensland, Australia'
    },
    {
      id: '11',
      name: 'Northern Lights Lodge',
      description: 'Glass-roofed luxury cabin perfect for viewing the Aurora Borealis, with private hot tub.',
      image: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&q=80&w=2000',
      rating: 4.8,
      price: 549,
      location: 'Rovaniemi, Finland'
    },
    {
      id: '12',
      name: 'Moroccan Desert Camp',
      description: 'Luxury desert camp with private tents, traditional cuisine, and camel trek experiences.',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=2000',
      rating: 4.7,
      price: 379,
      location: 'Sahara Desert, Morocco'
    },
    {
      id: '13',
      name: 'Caribbean Private Island',
      description: 'Exclusive island resort with private beaches, personal chef, and water sports facilities.',
      image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=2000',
      rating: 5.0,
      price: 1299,
      location: 'British Virgin Islands'
    }
  ],
  loading: false,
  error: null
};

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    setDestinations: (state, action: PayloadAction<Destination[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setDestinations, setLoading, setError } = destinationsSlice.actions;
export default destinationsSlice.reducer;