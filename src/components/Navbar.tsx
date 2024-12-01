import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { setUser, startLoading, } from '../store/authentication.slice';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogged, SignIn, SignOut } from '../services/auth.firebase';
import { RootState } from '../store';

const UserIcon = ()=> (<>
  {/*?xml version="1.0" ?*/}
  <svg style={{height:20, width:20}} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <title />
    <g data-name="Layer 7" id="Layer_7">
      <path
        className=" fill-primary-700 dark:fill-white"
        d="M19.75,15.67a6,6,0,1,0-7.51,0A11,11,0,0,0,5,26v1H27V26A11,11,0,0,0,19.75,15.67ZM12,11a4,4,0,1,1,4,4A4,4,0,0,1,12,11ZM7.06,25a9,9,0,0,1,17.89,0Z"
      />
    </g>
  </svg>
</>)
export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleBookNow = () => {
    navigate('/destinations');
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;
  const dispatchCallback = (payload) => {
    dispatch(setUser(payload));
  };
  const signIn = () => {
    dispatch(startLoading());
    SignIn(dispatchCallback);
    // navigate("/");
  };

  const { logged, loading, user } = useSelector(
    (state:RootState) => state?.authentication
  );

  useEffect(() => {
    const dispatchCallback = (user) => {
      dispatch(setUser({ user: user, error: null }));
    };
    try {
      checkLogged(dispatchCallback);
    } catch(e) {
      console.error(e);
    }
  }, [dispatch]);

  const signOut = () => {
    dispatch(startLoading());
    SignOut((user) => {
      dispatch(setUser({user}));
    });
  };
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
            {user? <div className='gap-1 flex justify-center items-center'>
              <UserIcon/>
              <span className='max-w-32 overflow-hidden text-nowrap' >{user.displayName}</span>
            </div>: null}
            <button 
              onClick={user? signOut: signIn}
              className={`${
                theme === 'dark' 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white px-4 py-2 rounded-lg transition-colors`}
            >
              {user? "Signout": "Login"}
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
            {user? <div className='gap-1 flex justify-start items-center'>
              <UserIcon/>
              <span className='max-w-32 overflow-hidden text-nowrap text-sm' >{user.displayName}</span>
            </div>: null}
            <button
              onClick={user? signOut: signIn}
              className={`w-full text-left px-3 py-2 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              } font-medium hover:bg-gray-50 rounded-md`}
            >
              {user? "Signout": "Login"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}