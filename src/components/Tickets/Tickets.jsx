import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRocket, FaTicketAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { setSelectedFlight } from '../../Features/flightSlice';

function Tickets() {
  const flights = useSelector((state) => state.flights.flights);
  const searchParams = useSelector((state) => state.flights.searchParams);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Debugging: Check the type and structure of flights
  console.log("Type of flights:", typeof flights);
  console.log("Is Array:", Array.isArray(flights));
  console.log("Flights:", flights);

  // Ensure flights is an array
  if (!Array.isArray(flights)) {
    return <div>Error: Flights data is not available.</div>;
  }

  // Filter flights based on 'from' and 'to' parameters only
  const filteredFlights = flights.filter((flight) => {
    const matchesFrom = flight.from.toLowerCase() === searchParams.from.toLowerCase();
    const matchesTo = flight.to.toLowerCase() === searchParams.to.toLowerCase();

    // Debugging: Log matching criteria
    console.log("Flight:", flight);
    console.log("Matches From:", matchesFrom);
    console.log("Matches To:", matchesTo);

    return matchesFrom && matchesTo;
  });

  const handleBookNow = (flight) => {
    dispatch(setSelectedFlight(flight));
    navigate('/booking');
  };

  return (
    <section className="py-12 bg-gray-100 mb-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Available Tickets</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => (
                <div key={flight.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col w-full sm:w-80">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-teal-500 text-xl font-bold">
                      {flight.from} <FaRocket className="text-orange-400 w-4 h-4 inline" /> {flight.to}
                    </p>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold text-neutral-600">Departure Time: <span>{flight.time}</span></p>
                      <FaTicketAlt className="text-orange-500 w-6 h-6" />
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold text-neutral-600">Arrival Time: <span>{flight.arrivalTime}</span></p>
                      <FaTicketAlt className="text-orange-500 w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-5 text-neutral-600">
                    <p>DATE: {flight.date}</p>
                    <p className="text-lg font-bold">Price: ₹{flight.price}</p>
                  </div>
                  <button
                    className="bg-orange-300 p-2 w-24 mx-auto mt-4 rounded-lg shadow-lg shadow-slate-500 hover:bg-orange-400 transition duration-300"
                    onClick={() => handleBookNow(flight)}
                  >
                    Book Now
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No flights available based on your search criteria.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tickets;
