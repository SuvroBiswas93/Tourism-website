import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=2000',
    title: 'Discover Paradise',
    subtitle: 'Explore pristine beaches and crystal-clear waters'
  },
  {
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000',
    title: 'Mountain Adventures',
    subtitle: 'Experience the thrill of mountain landscapes'
  },
  {
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000',
    title: 'Urban Exploration',
    subtitle: 'Discover vibrant cities and cultural landmarks'
  },
  {
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=2000',
    title: 'Ancient Wonders',
    subtitle: 'Journey through history and ancient civilizations'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNoResults, setShowNoResults] = useState(false);
  const navigate = useNavigate();
  const destinations = useSelector((state: RootState) => state.destinations.items);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNoResults(false);

    if (!searchQuery.trim()) return;

    const searchResults = destinations.filter(dest => 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (searchResults.length > 0) {
      sessionStorage.setItem('searchQuery', searchQuery);
      navigate('/destinations');
    } else {
      setShowNoResults(true);
      setTimeout(() => setShowNoResults(false), 3000);
    }
  };

  return (
    <div className="relative h-screen">
      {/* Slider */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm transition-all z-10"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm transition-all z-10"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 animate-fade-in">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in">
            {slides[currentSlide].subtitle}
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-2">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search destinations..."
                      className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
              
              {showNoResults && (
                <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-500 text-white rounded-lg text-sm animate-fade-in">
                  No destinations found. Try different keywords or browse our featured destinations below.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}