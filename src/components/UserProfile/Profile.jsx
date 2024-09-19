import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.flights.user);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const response = await fetch(`https://flight-backend-hc4f.onrender.com/api/bookings/user/${user._id}/bookings`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();
          setBookings(result);
        } else {
          console.error('Error fetching bookings:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBookings();
  }, [user]);

  const handlePrint = (bookingId) => {
    const printContent = document.getElementById(`booking-${bookingId}`).innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to reset the page content
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen"><p>Please log in to view your profile.</p></div>;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">My Tickets</h2>
        {bookings.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <li key={booking._id} id={`booking-${booking._id}`} className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg relative">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold uppercase rounded-bl-lg">Confirmed</div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-semibold text-indigo-600">{booking.from} &rarr; {booking.to}</div>
                  <div className="text-sm text-gray-500 m-2">{new Date(booking.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="text-sm text-gray-700 mb-1"><strong>Tickets:</strong> {booking.tickets}</div>
                <div className="text-sm text-gray-700 mb-1"><strong>Total Price: </strong> ${booking.totalPrice}</div>
                <div className="text-sm text-gray-700"><strong>Name:</strong> {booking.username}</div>
                <div className="border-t border-dashed border-gray-300 mt-2 pt-2">
                  <div className="text-xs text-gray-500 text-center">Thank you for booking with us!</div>
                </div>
                <button 
                  onClick={() => handlePrint(booking._id)}
                  className="mt-2 w-full text-center py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-800"
                >
                  Print Ticket
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center p-20'>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
