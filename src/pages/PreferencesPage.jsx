import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const allRoles = [
  "Frontend Developer", "Backend Engineer", "UI/UX Designer", "Data Analyst", "DevOps Engineer",
  "QA Tester", "Mobile Developer", "Product Manager", "Marketing Analyst", "System Admin",
  "AI Engineer", "Business Analyst", "HR Specialist", "Cloud Architect", "Graphic Designer"
];

const PreferencesPage = () => {
  const [preferences, setPreferences] = useState({
    jobType: "Internship",
    location: "",
    workMode: "Remote",
    skills: "",
    minSalary: "",
    maxSalary: "",
    roles: [],
    notifications: true,
  });

  useEffect(() => {
    const savedPrefs = JSON.parse(localStorage.getItem("studentPreferences"));
    if (savedPrefs) setPreferences({ ...preferences, ...savedPrefs });
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "notifications") {
      setPreferences({ ...preferences, notifications: checked });
    } else if (type === "checkbox" && name === "roles") {
      const newRoles = preferences.roles.includes(value)
        ? preferences.roles.filter((r) => r !== value)
        : [...preferences.roles, value];
      setPreferences({ ...preferences, roles: newRoles });
    } else {
      setPreferences({ ...preferences, [name]: value });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("studentPreferences", JSON.stringify(preferences));
    alert("Preferences saved successfully!");
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-xl mx-auto bg-white rounded shadow p-6 mt-8 mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Job Preferences</h1>
          <form onSubmit={handleSave} className="space-y-8">
            {/* Job Type */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <label className="block font-semibold mb-1 text-lg">What type of job do you want?</label>
              <select
                name="jobType"
                value={preferences.jobType}
                onChange={handleChange}
                className="select select-bordered w-full text-base"
              >
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
              <p className="text-xs text-gray-500">Choose the main type of job you are looking for.</p>
            </div>

            {/* Work Mode */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <label className="block font-semibold mb-1 text-lg">Where do you want to work?</label>
              <select
                name="workMode"
                value={preferences.workMode}
                onChange={handleChange}
                className="select select-bordered w-full text-base"
              >
                <option value="Remote">Remote (from home)</option>
                <option value="Hybrid">Hybrid (home & office)</option>
                <option value="On-site">On-site (office)</option>
              </select>
              <p className="text-xs text-gray-500">Pick your preferred work environment.</p>
            </div>

            {/* Location */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <label className="block font-semibold mb-1 text-lg">Preferred Location</label>
              <input
                name="location"
                placeholder="e.g. Mumbai, Delhi, Remote"
                value={preferences.location}
                onChange={handleChange}
                className="input input-bordered w-full text-base"
              />
              <p className="text-xs text-gray-500">Where do you want your job to be?</p>
            </div>

            {/* Salary Range */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <label className="block font-semibold mb-1 text-lg">Salary Range (per year)</label>
              <div className="flex gap-2">
                <input
                  name="minSalary"
                  type="number"
                  min="0"
                  placeholder="Min"
                  value={preferences.minSalary}
                  onChange={handleChange}
                  className="input input-bordered w-full text-base"
                />
                <span className="self-center">to</span>
                <input
                  name="maxSalary"
                  type="number"
                  min="0"
                  placeholder="Max"
                  value={preferences.maxSalary}
                  onChange={handleChange}
                  className="input input-bordered w-full text-base"
                />
              </div>
              <p className="text-xs text-gray-500">Enter your minimum and maximum expected salary.</p>
            </div>

            {/* Preferred Roles */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <label className="block font-semibold mb-1 text-lg">What jobs are you interested in?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {allRoles.map((role) => (
                  <label key={role} className="flex items-center gap-2 bg-white rounded px-2 py-1 cursor-pointer border border-gray-200">
                    <input
                      type="checkbox"
                      name="roles"
                      value={role}
                      checked={preferences.roles.includes(role)}
                      onChange={handleChange}
                      className="checkbox checkbox-xs"
                    />
                    <span className="text-base">{role}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500">Select as many roles as you like.</p>
            </div>

            {/* Skills */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <label className="block font-semibold mb-1 text-lg">Your Skills</label>
              <input
                name="skills"
                placeholder="e.g. React, Node.js, SQL"
                value={preferences.skills}
                onChange={handleChange}
                className="input input-bordered w-full text-base"
              />
              <p className="text-xs text-gray-500">List your skills, separated by commas.</p>
            </div>

            {/* Notifications */}
            <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3">
              <input
                type="checkbox"
                name="notifications"
                checked={preferences.notifications}
                onChange={handleChange}
                className="checkbox checkbox-md"
              />
              <span className="text-base">Send me job alerts and updates</span>
            </div>

            <button className="btn btn-primary w-full py-3 text-lg rounded-full font-bold mt-4">Save Preferences</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PreferencesPage;
