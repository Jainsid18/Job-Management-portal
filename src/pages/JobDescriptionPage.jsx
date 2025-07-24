// 1️⃣ Job Description Page
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobDescriptionPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("postedJobs")) || [];
    const found = jobs.find((j) => j.id.toString() === id);
    setJob(found);
  }, [id]);

  const handleApply = () => {
    const studentProfile = JSON.parse(localStorage.getItem("studentProfile"));
    if (!studentProfile) {
      alert("Please complete your profile first.");
      navigate("/profile");
      return;
    }

    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    const newJob = { ...job, studentId: studentProfile.email, status: "Applied" };
    const updated = [newJob, ...appliedJobs];
    localStorage.setItem("appliedJobs", JSON.stringify(updated));

    const allApplications = JSON.parse(localStorage.getItem("applications")) || [];
    const recruiterEntry = {
      jobId: job.id,
      role: job.role,
      applicant: studentProfile,
    };
    localStorage.setItem("applications", JSON.stringify([recruiterEntry, ...allApplications]));

    alert("Application submitted!");
    navigate("/applied-jobs");
  };

  if (!job) return <p className="p-6">Loading job details...</p>;

  return (
    <div className="min-h-screen bg-base-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{job.role}</h1>
        <p className="text-gray-600 mb-4">{job.company} — {job.location}</p>
        <p className="text-sm text-gray-600">Mode: {job.workMode}</p>
        <p className="text-sm text-gray-600">Vacancies: {job.vacancies}</p>
        <p className="text-sm text-gray-600">Experience: {job.experience} yrs</p>
        <p className="text-sm text-gray-600">Salary: {job.salary}</p>
        <p className="text-sm text-gray-600 mt-4">Skills: {job.skills}</p>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
          <p className="text-sm text-gray-700">{job.description}</p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 mb-2">What we offer</h3>
          <p className="text-sm text-gray-700">{job.offer}</p>
        </div>

        <div className="text-right mt-6">
          <button className="btn btn-primary" onClick={handleApply}>Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionPage;
