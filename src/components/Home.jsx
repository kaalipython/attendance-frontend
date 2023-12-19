import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make API request to verify user
    try {
      const response = await fetch('https://project-attendance-backend-topv.onrender.com//login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // User is verified, navigate to the dashboard page (replace 'dashboard' with your actual route)
        window.location.href = '/dashboard';
      } else {
        // User verification failed, display error message
        setError('Incorrect email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      setError('An error occurred while processing your request. Please try again later.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-danger mb-3">{error}</div>
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>
        Dont have account ?   <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Home;
