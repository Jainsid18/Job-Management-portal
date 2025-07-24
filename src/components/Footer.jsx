import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8 mt-10">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">ZidioConnect</h2>
        </div>
        <div className="flex flex-wrap gap-4 md:space-x-6 justify-center">
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
);

export default Footer; 