import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import type { RootState } from '../store';
import type { Destination } from '../types';
import SearchResults from '../components/SearchResults';
import DestinationCard from '../components/DestinationCard';

export default function Destinations() {
  const allDestinations = useSelector((state: RootState) => state.destinations.items);
  const [displayedDestinations, setDisplayedDestinations] = useState<Destination[]>(allDestinations);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Check for search query in sessionStorage
    const storedQuery = sessionStorage.getItem('searchQuery');
    if (storedQuery) {
      setSearchQuery(storedQuery);
      handleSearch(storedQuery);
      sessionStorage.removeItem('searchQuery');
    }
  }, [allDestinations]);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    const filteredDestinations = allDestinations.filter(dest =>
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.location.toLowerCase().includes(query.toLowerCase()) ||
      dest.description.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedDestinations(filteredDestinations);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isSearching ? `Search Results for "${searchQuery}"` : 'All Destinations'}
          </h1>
          {isSearching && (
            <p className="text-gray-600">
              Found {displayedDestinations.length} destination{displayedDestinations.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Destinations Grid */}
        {isSearching ? (
          <SearchResults destinations={displayedDestinations} searchQuery={searchQuery} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}