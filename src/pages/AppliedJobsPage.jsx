import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const USER_ID = 'student1'; // TODO: Replace with real user auth

const AppliedJobsPage = () => {
  const [applied, setApplied] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ai-job-management-portal.onrender.com/api/applied?userId=${USER_ID}`)
      .then(res => res.json())
      .then(data => {
        setApplied(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Applied Jobs</h1>

          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : applied.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">You haven't applied to any jobs yet.</p>
              <Link to="/job-listings" className="btn btn-outline btn-primary">
                Find Opportunities
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Mode</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {applied.map((job, idx) => (
                    <tr key={job.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">{job.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{job.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.workMode}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(job.appliedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppliedJobsPage;
