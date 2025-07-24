import React from 'react';
import { Link } from 'react-router-dom';

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Amazon",
    location: "Mumbai",
    type: "Internship",
  },
  {
    id: 2,
    title: "Remote AI Trainer",
    company: "Braintrust",
    location: "Remote",
    type: "Freelance",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-base-100 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <span className="text-xl font-bold text-blue-600">Zidio Connect</span>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          <Link to="/login" className="hover:text-blue-600">Login</Link>
          {/* <Link to="/register" className="hover:text-blue-600">Register</Link> */}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16 px-6 bg-blue-50">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the Right Opportunity</h1>
        <p className="text-lg text-gray-600 mb-6">Search for jobs, internships, and connect with top recruiters.</p>
       <Link to="/job-listings" className="btn btn-primary px-6 py-2">Browse Jobs</Link>

      </header>

      {/* Job Preview Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Top Job Picks</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {dummyJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md">
              <h3 className="text-xl font-semibold text-blue-700">{job.title}</h3>
              <p className="text-sm text-gray-700">{job.company} — {job.location}</p>
              <p className="text-xs text-gray-500 mt-1">{job.type}</p>
              <Link to="/job-listings" className="text-blue-500 text-sm mt-2 inline-block hover:underline">View</Link>

            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-4 text-gray-500 border-t">
        © {new Date().getFullYear()} Zidio Connect. All rights reserved. |
        <Link to="/privacy" className="hover:text-blue-600 mx-1">Privacy</Link>|
        <Link to="/terms" className="hover:text-blue-600 mx-1">Terms</Link>
      </footer>
    </div>
  );
};

export default HomePage;
