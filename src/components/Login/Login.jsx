import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Features/flightSlice'; // Import your action to set user
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(''); // State for forgot password email
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // State to toggle forgot password modal
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState(''); // State for forgot password success/error message
  const [showOTPModal, setShowOTPModal] = useState(false); // State to toggle OTP modal
  const [otp, setOtp] = useState(''); // State for OTP input
  const [newPassword, setNewPassword] = useState(''); // State for new password

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jetquestsubhajit.netlify.app/api/auth/login', formData, { withCredentials: true });
      console.log('User logged in:', response.data);
      // Dispatch the user data to the Redux store
      dispatch(setUser(response.data.user)); // Assuming the response contains the user object
      setSuccessMessage('Login successful');
      // Clear the form
      setFormData({
        email: '',
        password: '',
      });
      // Redirect to the home page
      setTimeout(() => {
        navigate('/');
      }, 2500); // Adjust the delay as needed
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Something went wrong');
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://jetquestsubhajit.netlify.app/api/auth/forgot-password', { email: forgotPasswordEmail });
      console.log('Response:', data); // Use the response in some way
      setForgotPasswordMessage('Password reset link sent to your email');
      setShowOTPModal(true); // Show OTP modal after sending reset link
    } catch (error) {
      console.error('Error sending password reset link:', error);
      setForgotPasswordMessage('Failed to send password reset link');
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jetquestsubhajit.netlify.app/api/auth/verify-otp', {
        email: forgotPasswordEmail, // Include the email
        otp,
        newPassword
      });
      console.log('Response:', response.data);
      setSuccessMessage('Password has been reset successfully.');
      setShowOTPModal(false);
      setOtp('');
      setNewPassword('');
    } catch (error) {
      console.error('Error resetting password:', error);
      setForgotPasswordMessage('Failed to reset password');
    }
  };

  return (
    <>
      <div>
        {successMessage && (
          <div className="mt-4 bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 flex justify-center" role="alert">
            <p className="font-bold">{successMessage}</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-indigo-200">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="mb-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={formData.password}
              onChange={handleChange}
            />
            <Link
              href="#"
              className="text-sm text-blue-600 mb-4 text-right"
              onClick={() => setShowForgotPasswordModal(true)} // Show forgot password modal
            >
              Forgot your password?
            </Link>
            <button className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">Login</button>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-center mb-4">Forgot Password</h2>
            <form onSubmit={handleForgotPasswordSubmit} className="flex flex-col">
              <input
                type="email"
                name="forgotPasswordEmail"
                placeholder="Enter your email"
                className="mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={forgotPasswordEmail}
                onChange={handleForgotPasswordChange}
              />
              <button className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                Send Reset Link
              </button>
            </form>
            {forgotPasswordMessage && (
              <div className="mt-4 text-center text-green-600">
                {forgotPasswordMessage}
              </div>
            )}
            <button
              className="mt-4 text-sm text-gray-600 underline"
              onClick={() => setShowForgotPasswordModal(false)} // Close the modal
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-center mb-4">OTP Verification</h2>
            <form onSubmit={handleOTPSubmit} className="flex flex-col">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={otp}
                onChange={handleOTPChange}
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                className="mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
              <button className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                Reset Password
              </button>
            </form>
            {forgotPasswordMessage && (
              <div className="mt-4 text-center text-green-600">
                {forgotPasswordMessage}
              </div>
            )}
            <button
              className="mt-4 text-sm text-gray-600 underline"
              onClick={() => setShowOTPModal(false)} // Close the OTP modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
