import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EditProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    profilePic: "",
    linkedIn: "",
    github: "",
    skills: "",
    resumeLink: "",
    education: "",
    institution: "",
    workRole: "",
    workCompany: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentProfile"));
    if (saved) setProfile({ ...profile, ...saved });
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("studentProfile", JSON.stringify(profile));
    navigate("/student-profile");
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4 mt-8 mb-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Edit My Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="bg-blue-50 rounded-lg p-3 space-y-3">
              <h2 className="text-base font-semibold mb-1">Personal Information</h2>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <img
                  src={profile.profilePic || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover"
                />
                <input
                  name="profilePic"
                  value={profile.profilePic}
                  onChange={handleChange}
                  className="input input-bordered input-sm w-full sm:w-2/3"
                  placeholder="Profile Picture URL"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <input name="fullName" value={profile.fullName} onChange={handleChange} className="input input-bordered input-sm w-full" placeholder="Full Name" required />
                <input name="email" value={profile.email} onChange={handleChange} type="email" className="input input-bordered input-sm w-full" placeholder="Email" required />
                <input name="phone" value={profile.phone} onChange={handleChange} type="tel" className="input input-bordered input-sm w-full" placeholder="Phone Number" required />
                <select name="gender" value={profile.gender} onChange={handleChange} className="select select-bordered select-sm w-full" required>
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-blue-50 rounded-lg p-3 space-y-3">
              <h2 className="text-base font-semibold mb-1">Social Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="linkedIn" value={profile.linkedIn} onChange={handleChange} className="input input-bordered input-sm w-full" placeholder="LinkedIn URL" />
                <input name="github" value={profile.github} onChange={handleChange} className="input input-bordered input-sm w-full" placeholder="GitHub URL" />
              </div>
            </div>

            {/* Skills & Resume */}
            <div className="bg-blue-50 rounded-lg p-3 space-y-3">
              <h2 className="text-base font-semibold mb-1">Skills & Resume</h2>
              <input name="skills" value={profile.skills} onChange={handleChange} className="input input-bordered input-sm w-full" placeholder="Skills (comma separated)" />
              <input name="resumeLink" value={profile.resumeLink} onChange={handleChange} className="input input-bordered input-sm w-full" placeholder="Resume Drive/Link" />
            </div>

            {/* Education */}
            <div className="bg-blue-50 rounded-lg p-3 space-y-3">
              <h2 className="text-base font-semibold mb-1">Education</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="education" value={profile.education} onChange={handleChange} className="input input-bordered input-sm w-full" placeholder="Education (e.g., BCA, MCA)" />
                <input name="institution" value={profile.institution} onChange={handleChange} className="input input-bordered input-sm w-full" placeholder="Institution Name" />
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-blue-50 rounded-lg p-3 space-y-3">
              <h2 className="text-base font-semibold mb-1">Work Experience</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="workRole" value={profile.workRole} onChange={handleChange} className="input input-bordered input-sm w-full" placeholder="Last Role (e.g., Intern)" />
                <input name="workCompany" value={profile.workCompany} onChange={handleChange} className="input input-bordered input-sm w-full" placeholder="Company Name" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
              <button type="submit" className="btn btn-primary btn-sm min-w-[100px] max-w-xs w-full sm:w-auto rounded-full font-bold">Save Changes</button>
              <button
                className="btn btn-outline btn-sm min-w-[100px] max-w-xs w-full sm:w-auto rounded-full font-bold"
                onClick={() => navigate('/student-profile')}
                type="button"
              >
                View Profile
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfilePage;
