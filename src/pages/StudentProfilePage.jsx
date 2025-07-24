import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StudentProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentProfile"));
    setProfile(stored);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Cover Section */}
        <div className="h-52 bg-cover bg-center" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1350&q=80')`
        }}></div>
        {/* Profile Card */}
        <div className="max-w-4xl mx-auto mt-[-60px] mb-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <div className="flex items-center space-x-6">
              <img
                src={profile?.profilePic || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white -mt-12 shadow-md object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{profile?.fullName || 'Your Name'}</h2>
                <p className="text-sm text-gray-500">{profile?.email || 'Email not set'}</p>
                <p className="text-sm text-gray-400">{profile?.phone || 'Phone not set'}</p>
                <p className="text-sm text-gray-400">{profile?.gender || ''}</p>
                {profile?.linkedIn && (
                  <p className="text-sm mt-1">
                    <a href={profile.linkedIn} className="link link-primary" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </p>
                )}
                {profile?.github && (
                  <p className="text-sm mt-1">
                    <a href={profile.github} className="link link-primary" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </p>
                )}
              </div>
              <div className="ml-auto">
                <Link to="/profile" className="btn btn-primary">Edit</Link>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                {profile?.skills
                  ? profile.skills.split(",").map((skill, index) => (
                      <span key={index} className="badge badge-outline">{skill.trim()}</span>
                    ))
                  : <span className="text-gray-400">No skills added</span>
                }
              </div>
            </div>

            {/* Resume */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Resume</h3>
              {profile?.resumeLink
                ? <a href={profile.resumeLink} className="link link-primary" target="_blank" rel="noopener noreferrer">View Resume</a>
                : <span className="text-gray-400">No resume uploaded</span>
              }
            </div>
            {/* Education */}
            {profile?.education && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Education</h3>
                <p className="text-sm text-gray-600">
                  {profile.education} at {profile.institution}
                </p>
              </div>
            )}

            {/* Work Experience */}
            {profile?.workRole && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Experience</h3>
                <p className="text-sm text-gray-600">
                  {profile.workRole} at {profile.workCompany}
                </p>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentProfilePage;
