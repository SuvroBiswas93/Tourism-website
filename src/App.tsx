import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import About from './pages/About';
import Booking from './pages/Booking';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/about" element={<About />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;