import React from "react";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden w-full max-w-6xl mt-8 mb-8">

          {/* Left Panel: Illustration / Branding */}
          <div className="md:w-1/2 bg-blue-100 flex items-center justify-center p-8">
            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="About"
                className="w-40 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-blue-700">Empowering Connections</h2>
              <p className="text-blue-600 mt-2">Students • Recruiters • Institutions</p>
            </div>
          </div>

          {/* Right Panel: About Content */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-primary mb-4">About Zidio Connect</h1>
            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              Zidio Connect is a next-gen job and internship portal designed to bridge the gap between ambitious students and top companies.
              Our platform makes recruitment faster, smarter, and more transparent.
            </p>

            <div className="space-y-4">
              <div className="bg-base-100 p-4 border-l-4 border-primary rounded shadow-sm">
                <h3 className="text-lg font-semibold text-secondary">🎓 For Students</h3>
                <p className="text-gray-600">Discover opportunities, apply instantly, and track your progress in one dashboard.</p>
              </div>

              <div className="bg-base-100 p-4 border-l-4 border-secondary rounded shadow-sm">
                <h3 className="text-lg font-semibold text-secondary">💼 For Recruiters</h3>
                <p className="text-gray-600">Effortlessly post openings, filter candidates, and hire the right talent faster.</p>
              </div>

              <div className="bg-base-100 p-4 border-l-4 border-accent rounded shadow-sm">
                <h3 className="text-lg font-semibold text-secondary">🏫 For Institutions</h3>
                <p className="text-gray-600">Track student placements, view analytics, and manage partnerships with ease.</p>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8 text-gray-400 text-sm">
              <Link to="/privacy" className="hover:text-blue-600">Privacy</Link>
              <span>|</span>
              <Link to="/terms" className="hover:text-blue-600">Terms</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
