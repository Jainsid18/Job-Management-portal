import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">ZidioConnect</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {/* <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Home</Link> */}
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
              {/* <Link to="/register" className="text-gray-700 hover:text-blue-600 transition">Register</Link> */}
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">Contact</Link>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Home</Link>
              <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">About</Link>
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Login</Link>
              {/* <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Register</Link> */}
              <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Contact</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Your <span className="text-blue-600">Dream Job</span> Today
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Connect with thousands of companies and start your career journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow transition"
            >
              Browse Jobs
            </Link>
            {/* <Link
              to="/register"
              className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-6 rounded-lg shadow border border-gray-300 transition"
            >
              Post a Job
            </Link> */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">ZidioConnect</h2>
              {/* <p className="text-gray-400">Connecting talent with opportunity</p> */}
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-400 hover:text-white transition">About</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition">Terms</Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
