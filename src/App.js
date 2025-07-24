import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
// import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import JobListingPage from './pages/JobListingPage';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import SavedJobsPage from "./pages/SavedJobsPage";
import AppliedJobsPage from './pages/AppliedJobsPage';
import PreferencesPage from './pages/PreferencesPage';
import EditProfilePage from './pages/EditProfilePage';
import StudentProfilePage from './pages/StudentProfilePage';
import JobDescriptionPage from './pages/JobDescriptionPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/job-listings" element={<JobListingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/saved-jobs" element={<SavedJobsPage />} />
        <Route path="/applied-jobs" element={<AppliedJobsPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/profile" element={<EditProfilePage />} />
        <Route path="/student-profile" element={<StudentProfilePage />} />
        <Route path="/job/:id" element={<JobDescriptionPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
