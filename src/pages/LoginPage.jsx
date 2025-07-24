import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Optional custom CSS

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Get saved role from localStorage
    const savedRole = localStorage.getItem('userRole');

    // Redirect based on role
    if (savedRole === 'Recruiter') {
      navigate("/student-dashboard");
    } else if (savedRole === 'Student') {
      navigate("/student-dashboard");
    } else {
      navigate("/student-dashboard"); // Fallback
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">

        {/* Left Panel: Branding */}
        <div className="md:w-1/2 bg-yellow-400 flex items-center justify-center p-8">
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
              alt="login banner"
              className="w-40 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
            <p className="text-white mt-2">Login and explore exciting career opportunities</p>
          </div>
        </div>

        {/* Right Panel: Login Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label font-medium">Email</label>
              <input type="email" placeholder="Enter your email" className="input input-bordered w-full" required />
            </div>

            <div className="form-control">
              <label className="label font-medium">Password</label>
              <input type="password" placeholder="Enter your password" className="input input-bordered w-full" required />
            </div>

            <div className="form-control">
              <button type="submit" className="btn btn-primary w-full">Login</button>
            </div>
  
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
