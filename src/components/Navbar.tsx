import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleBookNow = () => {
    navigate('/destinations');
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg fixed w-full z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Compass className={`h-8 w-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className="text-xl font-bold">Wanderlust</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`relative py-2 transition-colors ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              <span>Home</span>
              {isActive('/') && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                } transition-transform duration-300`} />
              )}
            </Link>
            <Link 
              to="/destinations" 
              className={`relative py-2 transition-colors ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              <span>Destinations</span>
              {isActive('/destinations') && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                } transition-transform duration-300`} />
              )}
            </Link>
            <Link 
              to="/about" 
              className={`relative py-2 transition-colors ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              <span>About</span>
              {isActive('/about') && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                } transition-transform duration-300`} />
              )}
            </Link>
            <Link 
              to="/contact" 
              className={`relative py-2 transition-colors ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'
              }`}
            >
              <span>Contact</span>
              {isActive('/contact') && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                } transition-transform duration-300`} />
              )}
            </Link>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } transition-colors`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button 
              onClick={handleBookNow}
              className={`${
                theme === 'dark' 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white px-4 py-2 rounded-lg transition-colors`}
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } transition-colors`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'} focus:outline-none`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden absolute w-full ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        } shadow-lg transition-colors`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md ${
                isActive('/') 
                  ? theme === 'dark' ? 'bg-gray-800 text-blue-400' : 'bg-blue-50 text-blue-600'
                  : theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/destinations"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md ${
                isActive('/destinations')
                  ? theme === 'dark' ? 'bg-gray-800 text-blue-400' : 'bg-blue-50 text-blue-600'
                  : theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
              } transition-colors`}
            >
              Destinations
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md ${
                isActive('/about')
                  ? theme === 'dark' ? 'bg-gray-800 text-blue-400' : 'bg-blue-50 text-blue-600'
                  : theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
              } transition-colors`}
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md ${
                isActive('/contact')
                  ? theme === 'dark' ? 'bg-gray-800 text-blue-400' : 'bg-blue-50 text-blue-600'
                  : theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
              } transition-colors`}
            >
              Contact
            </Link>
            <button
              onClick={handleBookNow}
              className={`w-full text-left px-3 py-2 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              } font-medium hover:bg-gray-50 rounded-md`}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}