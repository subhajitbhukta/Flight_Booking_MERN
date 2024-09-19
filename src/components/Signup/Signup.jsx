import React, { useState } from 'react';
import axios from 'axios';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showAdminError, setShowAdminError] = useState(false); // State for admin error notification

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', formData);
      console.log('User created:', response.data);
      setSuccessMessage('Signup successful, Please login with your account');
      setFormData({
        name: '',
        email: '',
        password: '',
        isAdmin: false,
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.response && error.response.status === 400 && error.response.data.message === 'An admin already exists. Only one admin is allowed.') {
        setShowAdminError(true); // Show admin error notification
      } else {
        alert('Error signing up');
      }
    }
  };

  return (
    <>
      {successMessage && (
        <div className="mt-4 bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 flex justify-center" role="alert">
          <p>{successMessage}</p>
        </div>
      )}
      {showAdminError && ( // Admin error notification centered
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md">
            <strong>An admin already exists. Only one admin is allowed.</strong>
            <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => setShowAdminError(false)}>×</button>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-indigo-200">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full max-sm:m-8">
          <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
          <span className="block text-sm text-center mb-4">Or use your email for registration</span>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" className="mb-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" className="mb-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" className="mb-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={formData.password} onChange={handleChange} />
            <label className="mb-4 flex items-center">
              <input type="checkbox" name="isAdmin" className="mr-2" checked={formData.isAdmin} onChange={handleChange} />
              Sign up as Admin
            </label>
            <button type="submit" className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">Sign Up</button>
          </form>
          <button 
            className="mt-4 bg-red-600 text-white py-2 rounded-md w-full hover:bg-red-700 transition duration-300"
            onClick={() => navigate('/admin-login')}
          >
            Admin Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;
