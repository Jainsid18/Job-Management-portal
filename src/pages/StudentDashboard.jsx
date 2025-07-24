import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const USER_ID = 'student1'; // TODO: Replace with real user auth

const StudentDashboard = () => {
  const [recentApplications, setRecentApplications] = useState([]);
  const studentName = "Student"; // Can be made dynamic later
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ai-job-management-portal.onrender.com/api/applied?userId=${USER_ID}`)
      .then(res => res.json())
      .then(data => {
        // Sort by appliedAt descending and take the first 4 (most recent)
        const sorted = data.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
        setRecentApplications(sorted.slice(0, 4));
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Welcome Section */}
        <header className="text-center py-10 px-6 bg-blue-50">
          <h1 className="text-3xl font-bold mb-2">Welcome, {studentName}!</h1>
          <p className="text-gray-600">"Opportunities don't happen, you create them."</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link
              to="/job-listings"
              className="btn btn-primary min-w-[120px] max-w-xs w-full sm:w-auto px-4 py-2 rounded-full shadow hover:scale-105 transition-transform text-white font-semibold"
            >
              Explore Jobs
            </Link>
            <a
              href="https://resume-builder-app-mern.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-secondary min-w-[120px] max-w-xs w-full sm:w-auto px-4 py-2 rounded-full shadow hover:scale-105 transition-transform font-semibold"
            >
              Create Resume
            </a>
          </div>
        </header>

        {/* Quick Actions */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: '📝 Saved Jobs',
                desc: 'View your bookmarked opportunities.',
                link: '/saved-jobs',
                btn: 'View',
              },
              {
                title: '📤 Applied Jobs',
                desc: 'Track your job applications.',
                link: '/applied-jobs',
                btn: 'Track',
              },
              {
                title: '⚙️ Create Resume',
                desc: 'Make your professional resume in one click.',
                link: 'https://resume-builder-app-mern.vercel.app/',
                btn: 'Resume    ',
              },
              {
                title: '🧾 Edit Profile',
                desc: 'Update your information and resume.',
                link: '/profile',
                btn: 'Edit',
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg flex flex-col justify-between h-56 p-6 transition-transform transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100"
              >
                <div>
                  <h3 className="text-xl font-bold text-blue-700 text-center mb-2 flex justify-center items-center">{card.title}</h3>
                  <p className="text-gray-500 text-center mb-6">{card.desc}</p>
                </div>
                <div className="flex justify-center mt-auto">
                  <Link
                    to={card.link}
                    className="btn btn-primary btn-sm w-full max-w-[120px] rounded-full shadow-md hover:scale-105 transition-transform text-center"
                  >
                    {card.btn}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Applications */}
        <section className="max-w-5xl mx-auto px-4 pb-10">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Recent Applications</h2>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : recentApplications.length === 0 ? (
            <p className="text-gray-600">You haven't applied to any jobs yet.</p>
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
                  {recentApplications.map((job, idx) => (
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StudentDashboard;
