import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsPage = () => (
  <div className="min-h-screen bg-base-200 flex flex-col">
    <Navbar />
    <main className="flex-1 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden w-full max-w-6xl mt-8 mb-8">
        {/* Left Panel: Illustration */}
        <div className="md:w-1/2 bg-blue-100 flex items-center justify-center p-8">
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Terms"
              className="w-40 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-blue-700">Terms & Conditions</h2>
            <p className="text-blue-600 mt-2">Please read our terms before using Zidio Connect.</p>
          </div>
        </div>
        {/* Right Panel: Terms Content */}
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-primary mb-4">Terms & Conditions</h1>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
            <li>By using Zidio Connect, you agree to our privacy policy and code of conduct.</li>
            <li>All information provided must be accurate and up to date.</li>
            <li>Accounts found to be fraudulent or abusive will be suspended.</li>
            <li>Job postings and applications must comply with applicable laws.</li>
            <li>We reserve the right to update these terms at any time.</li>
          </ul>
          <p className="text-gray-500 text-sm">
            For questions about these terms, contact <a href="mailto:support@zidioconnect.com" className="text-blue-600 underline">support@zidioconnect.com</a>.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermsPage; 