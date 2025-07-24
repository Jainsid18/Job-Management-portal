import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPage = () => (
  <div className="min-h-screen bg-base-200 flex flex-col">
    <Navbar />
    <main className="flex-1 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden w-full max-w-6xl mt-8 mb-8">
        {/* Left Panel: Illustration */}
        <div className="md:w-1/2 bg-blue-100 flex items-center justify-center p-8">
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="Privacy"
              className="w-40 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-blue-700">Your Privacy Matters</h2>
            <p className="text-blue-600 mt-2">We protect your data and respect your privacy.</p>
          </div>
        </div>
        {/* Right Panel: Privacy Content */}
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-primary mb-4">Privacy Policy</h1>
          <p className="text-gray-700 mb-6 text-base leading-relaxed">
            At Zidio Connect, your privacy is our top priority. We collect only the information necessary to provide our services and never share your personal data with third parties without your consent.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>We collect your name, email, and profile details to personalize your experience.</li>
            <li>Your data is stored securely and used only for job and internship matching.</li>
            <li>We do not sell or rent your information to anyone.</li>
            <li>You can update or delete your profile at any time.</li>
            <li>Cookies are used only to enhance your browsing experience.</li>
          </ul>
          <p className="text-gray-500 mt-6 text-sm">
            For any privacy-related questions, contact us at <a href="mailto:support@zidioconnect.com" className="text-blue-600 underline">support@zidioconnect.com</a>.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPage; 