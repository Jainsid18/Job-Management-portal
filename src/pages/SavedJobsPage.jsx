import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(stored);
  }, []);

  const handleRemove = (id) => {
    const updated = savedJobs.filter((job) => job.id !== id);
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  const handleApply = (job) => {
    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    localStorage.setItem("appliedJobs", JSON.stringify([job, ...applied]));
    handleRemove(job.id);
    navigate("/applied-jobs");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Saved Jobs</h1>

          {savedJobs.length === 0 ? (
            <p className="text-gray-600">You have not saved any jobs yet.</p>
          ) : (
            <div className="grid gap-4">
              {savedJobs.map((job) => (
                <div key={job.id} className="border p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-blue-600">{job.role}</h2>
                      <p className="text-sm text-gray-600">
                        {job.company || "Unknown"} — {job.workMode || ""}
                      </p>
                      <p className="text-xs text-gray-400">
                        Closing Date: {job.closingDate || "N/A"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-primary"
                        onClick={() => handleApply(job)}
                      >
                        Apply
                      </button>
                      <button
                        className="btn btn-sm btn-error text-white"
                        onClick={() => handleRemove(job.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SavedJobsPage;
