import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include withCredentials to send cookies
      const response = await axios.post('https://flight-backend-hc4f.onrender.com/api/auth/admin-login', formData, {
        withCredentials: true, // Important to include credentials (cookies)
      });
      console.log('Admin logged in:', response.data);
      // Assuming a successful login sets a token in cookies and redirects to the admin dashboard
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Error logging in. Please check your credentials.');
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="mt-4 bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 flex justify-center" role="alert">
          <p>{errorMessage}</p>
        </div>
      )}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-indigo-200">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full max-sm:m-8">
          <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="mb-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
