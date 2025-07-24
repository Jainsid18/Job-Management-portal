import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/JL-Navbar';
import Footer from '../components/Footer';

const jobTypes = ["Full-time", "Part-time", "Internship"];
const workModes = ["Remote", "Onsite", "Hybrid"];

const USER_ID = 'student1'; // TODO: Replace with real user auth

const JobListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [salaryRange, setSalaryRange] = useState([0, 150000]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);
  const [recentOnly, setRecentOnly] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // Fetch jobs from backend
  useEffect(() => {
    fetch('https://ai-job-management-portal.onrender.com/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setFilteredJobs(data);
        // Set salary range based on jobs
        if (data.length > 0) {
          const min = Math.min(...data.map(j => j.salary));
          const max = Math.max(...data.map(j => j.salary));
          setSalaryRange([min, max]);
        }
      });
  }, []);

  // Helper: recent jobs = posted in last 7 days
  const isRecent = (job) => {
    const today = new Date();
    const posted = new Date(job.postedDate);
    const diff = (today - posted) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  };

  const handleApply = async (job) => {
    try {
      const res = await fetch('https://ai-job-management-portal.onrender.com/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          userId: USER_ID,
          role: job.role,
          company: job.company,
          workMode: job.workMode,
        })
      });
      if (res.ok) {
        setSuccessMsg(`Congrats, successfully applied to the ${job.role} job.`);
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setSuccessMsg("Failed to apply. Try again.");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (e) {
      setSuccessMsg("Failed to apply. Try again.");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  // Filter logic
  const applyFilters = () => {
    let filtered = [...jobs];
    filtered = filtered.filter(j => j.salary >= salaryRange[0] && j.salary <= salaryRange[1]);
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(j => selectedTypes.includes(j.type));
    }
    if (selectedModes.length > 0) {
      filtered = filtered.filter(j => selectedModes.includes(j.workMode));
    }
    if (recentOnly) {
      filtered = filtered.filter(isRecent);
    }
    setFilteredJobs(filtered);
    setShowFilters(false);
  };

  const clearFilters = () => {
    if (jobs.length > 0) {
      const min = Math.min(...jobs.map(j => j.salary));
      const max = Math.max(...jobs.map(j => j.salary));
      setSalaryRange([min, max]);
    }
    setSelectedTypes([]);
    setSelectedModes([]);
    setRecentOnly(false);
    setFilteredJobs(jobs);
    setShowFilters(false);
  };

  // Salary slider handlers
  const handleSalaryChange = (e, idx) => {
    const val = Number(e.target.value);
    setSalaryRange(idx === 0 ? [val, salaryRange[1]] : [salaryRange[0], val]);
  };

  // Checkbox handlers
  const handleTypeChange = (type) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };
  const handleModeChange = (mode) => {
    setSelectedModes(prev => prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-700">Job Listings</h1>
          <button
            className="btn btn-ghost btn-xs px-2 py-1 min-h-0 h-8 w-8 flex items-center justify-center border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition sm:h-8 sm:w-8"
            onClick={() => setShowFilters(f => !f)}
            aria-expanded={showFilters}
            aria-controls="filter-section"
            title="Show filters"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17v-3.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" /></svg>
          </button>
        </div>
        {successMsg && <div className="alert alert-success mb-4 text-center text-green-700">{successMsg}</div>}
        {showFilters && (
          <section id="filter-section" className="mb-6 p-3 rounded bg-white shadow flex flex-col gap-3 w-full max-w-md mx-auto">
            {/* Salary Range */}
            <div className="flex flex-col gap-1 w-full">
              <label className="block font-medium mb-1">Salary Range ($)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={salaryRange[0]}
                  max={salaryRange[1]}
                  value={salaryRange[0]}
                  onChange={e => handleSalaryChange(e, 0)}
                  className="input input-bordered input-xs w-20"
                  aria-label="Minimum salary"
                />
                <span>-</span>
                <input
                  type="number"
                  min={salaryRange[0]}
                  max={salaryRange[1]}
                  value={salaryRange[1]}
                  onChange={e => handleSalaryChange(e, 1)}
                  className="input input-bordered input-xs w-20"
                  aria-label="Maximum salary"
                />
              </div>
            </div>
            {/* Job Type */}
            <div className="flex flex-col gap-1 w-full">
              <label className="block font-medium mb-1">Type of Job</label>
              <div className="flex gap-2 flex-wrap">
                {jobTypes.map(type => (
                  <label key={type} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      className="checkbox checkbox-xs"
                    />
                    <span className="text-xs">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Work Mode */}
            <div className="flex flex-col gap-1 w-full">
              <label className="block font-medium mb-1">Work Mode</label>
              <div className="flex gap-2 flex-wrap">
                {workModes.map(mode => (
                  <label key={mode} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={selectedModes.includes(mode)}
                      onChange={() => handleModeChange(mode)}
                      className="checkbox checkbox-xs"
                    />
                    <span className="text-xs">{mode}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Recent Jobs */}
            <div className="flex flex-col gap-1 w-full">
              <label className="block font-medium mb-1">Recent Jobs</label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={recentOnly}
                  onChange={() => setRecentOnly(r => !r)}
                  className="checkbox checkbox-xs"
                />
                <span className="text-xs">Show jobs posted in last 7 days</span>
              </label>
            </div>
            <div className="flex gap-2 mt-2 justify-end">
              <button className="btn btn-primary btn-xs px-3" onClick={applyFilters}>Apply</button>
              <button className="btn btn-ghost btn-xs px-3" onClick={clearFilters}>Clear</button>
            </div>
          </section>
        )}
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <caption className="sr-only">Job Listings</caption>
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Mode</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closing Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-600">No jobs available.</td>
                </tr>
              ) : (
                filteredJobs.map((job, idx) => (
                  <tr key={job.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">{job.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{job.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.workMode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${job.salary.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.closingDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-outline" onClick={() => handleApply(job)} aria-label={`Apply to job: ${job.role}`}>Apply</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobListingPage;
