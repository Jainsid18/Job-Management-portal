import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="hover:text-blue-600">
            <Link to="/student-dashboard" className="hover:text-blue-600"> <span className="text-xl font-bold text-blue-600">ZidioConnect</span></Link>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/student-dashboard" className={location.pathname === "/" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition"}>Home</Link>
            <Link to="https://resume-builder-app-mern.vercel.app/" className={location.pathname === "/about" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition"}>Create Resume</Link>
            <Link to="/applied-jobs" className={location.pathname === "/job-listings" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}>Applied Jobs</Link>
            <Link to="/student-profile" className={location.pathname === "/student-profile" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}>Profile</Link>
            <Link to="/contact" className={location.pathname === "/contact" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition"}>Contact</Link>
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
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Home</Link>
            <Link to="https://resume-builder-app-mern.vercel.app/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Create Resume</Link>
            <Link to="/applied-jobs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Applied Jobs</Link>
            <Link to="/student-profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Profile</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 