import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://jenishabackend.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status==201) {
        // Registration successful, you may redirect or show a success message
        console.log('Registration successful');
        setError('Registration successful');
        setFormData({
          name: '',
          email: '',
          password: '',
        })
      } else {
        // Registration failed, handle errors
        const data = await response.json();
        setError(data.message);
        setFormData({
          name: '',
          email: '',
          password: '',
        })
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-40">
        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <div className="text-info mb-3">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <div className="mt-3">
          Already registered? <Link to="/">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
