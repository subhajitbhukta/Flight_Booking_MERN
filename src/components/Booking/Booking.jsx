import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Booking() {
  const selectedFlight = useSelector((state) => state.flights.selectedFlight);
  const currentUser = useSelector((state) => state.flights.user);
  const [tickets, setTickets] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('free');
  const [loading, setLoading] = useState(false); // New loading state
  const [showNotification, setShowNotification] = useState(false);
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate('/login');
      }, 3000);
    }
  }, [currentUser, navigate]);

  if (!selectedFlight) {
    navigate('/tickets');
    return null;
  }

  const handleTicketsChange = (e) => {
    setTickets(e.target.value);
  };

  const handleConfirmBooking = async () => {
    if (paymentMethod === 'creditCard' || paymentMethod === 'paypal') {
      setShowPaymentAlert(true);
      setTimeout(() => setShowPaymentAlert(false), 3000);
      return;
    }

    const bookingData = {
      flightId: selectedFlight.id,
      username: currentUser.name,
      tickets: parseInt(tickets, 10),
      totalPrice: selectedFlight.price * tickets,
      from: selectedFlight.from,
      to: selectedFlight.to,
      paymentMethod,
    };

    try {
      setLoading(true);
      const response = await fetch('https://jetquestsubhajit.netlify.app/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
        credentials: 'include',
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        setShowSuccessPopup(true); // Show success popup
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate('/profile'); // Redirect after popup hides
        }, 3000); // Show popup for 3 seconds
      } else {
        setErrorMessage(result.message || 'Error occurred during booking.');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Error confirming booking. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-indigo-200">
      {showNotification && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-md shadow-lg">
          No user logged in. Please Login....
        </div>
      )}
      {showPaymentAlert && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white py-2 px-4 rounded-md shadow-lg">
          Credit Card and PayPal options are currently unavailable.
        </div>
      )}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white text-lg py-4 px-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out">
            🎉 Booking Successful! Your adventure awaits. ✈️
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-md shadow-lg">
          {errorMessage}
        </div>
      )}
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Booking Confirmation</h2>
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">{selectedFlight.from} to {selectedFlight.to}</p>
          <p className="text-sm text-gray-600">Departure: {selectedFlight.date} at {selectedFlight.time}</p>
          <p className="text-sm text-gray-600">Price per ticket: ₹{selectedFlight.price}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <label htmlFor="tickets" className="text-sm font-semibold">Tickets:</label>
          <input
            type="number"
            id="tickets"
            name="tickets"
            className="w-16 p-2 border rounded-md"
            value={tickets}
            min="1"
            onChange={handleTicketsChange}
          />
        </div>
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">Total Price: ₹{selectedFlight.price * tickets}</p>
        </div>
        <div className="mb-4">
          <label className="text-sm font-semibold mb-2 block">Payment Method:</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="free"
                checked={paymentMethod === 'free'}
                onChange={() => setPaymentMethod('free')}
                className="form-radio"
              />
              <span className="text-sm">Free</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={() => setPaymentMethod('creditCard')}
                className="form-radio"
              />
              <span className="text-sm">Credit Card (Unavailable)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
                className="form-radio"
              />
              <span className="text-sm">PayPal (Unavailable)</span>
            </label>
          </div>
        </div>
        <button
          className={`bg-indigo-600 text-white py-2 rounded-md w-full hover:bg-indigo-700 transition duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleConfirmBooking}
          disabled={loading}
        >
          {loading ? 'Confirming...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
}

export default Booking;
