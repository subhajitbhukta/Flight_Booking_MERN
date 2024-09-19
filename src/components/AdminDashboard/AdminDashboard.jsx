import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    flightId: '',
    username: '',
    tickets: '',
    totalPrice: '',
    from: '',
    to: '',
  });
  const [logoutMessage, setLogoutMessage] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://jetquestsubhajit.netlify.app/api/bookings', { withCredentials: true });
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('https://jetquestsubhajit.netlify.app/api/auth/logout', { withCredentials: true });
      setLogoutMessage('You have successfully logged out.');
      setTimeout(() => {
        navigate('/admin-login');
      }, 2000); 
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Failed to logout. Please try again later.');
    }
  };

  const handleDelete = (id) => {
    setBookingToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (bookingToDelete) {
      try {
        await axios.delete(`https://jetquestsubhajit.netlify.app/api/bookings/${bookingToDelete}`, { withCredentials: true });
        setBookings(bookings.filter(booking => booking._id !== bookingToDelete));
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('Error deleting booking:', error.response ? error.response.data : error.message);
        setError('Failed to delete booking. Please try again later.');
        setIsDeleteModalOpen(false);
      }
      
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (booking) => {
    setBookingToEdit(booking._id);
    setEditFormData({
      flightId: booking.flightId,
      username: booking.username,
      tickets: booking.tickets,
      totalPrice: booking.totalPrice,
      from: booking.from,
      to: booking.to,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const confirmEdit = async () => {
    if (bookingToEdit) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/bookings/${bookingToEdit}`,
          editFormData,
          { withCredentials: true }
        );
        setBookings(bookings.map(booking => (booking._id === bookingToEdit ? response.data.booking : booking)));
        setIsEditModalOpen(false);
      } catch (error) {
        console.error('Error editing booking:', error);
        setError('Failed to edit booking. Please try again later.');
        setIsEditModalOpen(false);
      }
    }
  };

  const cancelEdit = () => {
    setIsEditModalOpen(false);
  };

  // Calculate total tickets, total income, and total flights
  const totalTickets = bookings.reduce((sum, booking) => sum + booking.tickets, 0);
  const totalIncome = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const totalFlights = new Set(bookings.map(booking => booking.flightId)).size;

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
        {/* Logout success message */}
        {logoutMessage && (
          <div className="bg-red-800 text-white border border-red-400 p-4 rounded-lg mb-4 text-center">
            {logoutMessage}
          </div>
        )}

       <div className="flex justify-end items-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-800 transition duration-300 shadow-md"
        >
          Logout
        </button>
      </div>
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Admin Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">All Bookings</h2>

      {/* Total Tickets, Income, and Flights Boxes */}
      <div className="flex flex-wrap justify-center mb-6 gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-xl rounded-lg p-6 transform transition-transform duration-500 hover:scale-105 flex flex-col justify-between text-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <h3 className="text-lg font-semibold">Total Tickets Sold</h3>
          <p className="text-3xl font-bold">{totalTickets}</p>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-400 shadow-xl rounded-lg p-6 transform transition-transform duration-500 hover:scale-105 flex flex-col justify-between text-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <h3 className="text-lg font-semibold">Total Income</h3>
          <p className="text-3xl font-bold">₹ {totalIncome.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-400 shadow-xl rounded-lg p-6 transform transition-transform duration-500 hover:scale-105 flex flex-col justify-between text-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <h3 className="text-lg font-semibold">Total Flights</h3>
          <p className="text-3xl font-bold">{totalFlights}</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <p className="text-center text-lg">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-left">Flight ID</th>
                <th className="py-3 px-4 text-left">Tickets</th>
                <th className="py-3 px-4 text-left">Total Price</th>
                <th className="py-3 px-4 text-left">From</th>
                <th className="py-3 px-4 text-left">To</th>
                <th className="py-3 px-4 text-left">Booking Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{booking.username}</td>
                  <td className="py-2 px-4">{booking.flightId}</td>
                  <td className="py-2 px-4">{booking.tickets}</td>
                  <td className="py-2 px-4">₹{booking.totalPrice.toFixed(2)}</td>
                  <td className="py-2 px-4">{booking.from}</td>
                  <td className="py-2 px-4">{booking.to}</td>
                  <td className="py-2 px-4">{new Date(booking.createdAt).toLocaleString()}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(booking)}
                      className="text-white hover:bg-yellow-600 font-semibold bg-yellow-400 p-3 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="text-white hover:bg-red-800 font-semibold bg-red-600 p-2 rounded-lg"
                    >
                      Cancel Ticket
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Are you sure you want to cancel this booking?</h3>
            <div className="flex justify-end mt-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Booking Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Booking</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="flightId"
                value={editFormData.flightId}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Flight ID"
              />
              <input
                type="text"
                name="username"
                value={editFormData.username}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Username"
              />
              <input
                type="number"
                name="tickets"
                value={editFormData.tickets}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Tickets"
              />
              <input
                type="number"
                name="totalPrice"
                value={editFormData.totalPrice}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Total Price"
              />
              <input
                type="text"
                name="from"
                value={editFormData.from}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="From"
              />
              <input
                type="text"
                name="to"
                value={editFormData.to}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="To"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={cancelEdit}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmEdit}
                className="bg-green-600 text-white py-2 px-4 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


     
    </div>
  );
}

export default AdminDashboard;
