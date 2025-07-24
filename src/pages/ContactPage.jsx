import React from "react";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto text-center mt-8 mb-8">
          <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-12">
            We're here to help you with anything related to jobs, internships, and collaborations.
          </p>

          {/* Help Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-xl font-semibold mb-2">Students</h2>
              <p className="text-gray-600 mb-4">For job/internship-related queries and support.</p>
              <button className="btn btn-primary">Visit student help center</button>

            </div>

            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-xl font-semibold mb-2">Recruiters</h2>
              <p className="text-gray-600 mb-4">For employer assistance and posting opportunities.</p>
              <button className="btn btn-primary">Visit recruiter help center</button>
            </div>

            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-xl font-semibold mb-2">Institutions</h2>
              <p className="text-gray-600 mb-4">For campus partnerships and placement coordination.</p>
              <button className="btn btn-primary">Visit institution help center</button>
            </div>
          </div>

          {/* Contact Info & Address */}
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white shadow-md rounded p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">General Inquiries</h3>
              <p className="mb-2"><strong>Email:</strong> support@zidioconnect.com</p>
              <p className="mb-2"><strong>Phone:</strong> +91 1234567890</p>
              <p className="mb-2"><strong>Partnerships:</strong> partner@zidioconnect.com</p>
              <p className="mb-2"><strong>Feedback:</strong> feedback@zidioconnect.com</p>
            </div>

            <div className="bg-white shadow-md rounded p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Our Office</h3>
              <p>Zidio Connect Pvt. Ltd.</p>
              <p> Maharashtra - 411001</p>
              <p className="mt-2">Working Hours: Mon – Fri, 10:00 AM to 6:00 PM</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                alt="map"
                className="w-10 mt-4"
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8 text-gray-400 text-sm">
            <Link to="/privacy" className="hover:text-blue-600">Privacy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-blue-600">Terms</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
