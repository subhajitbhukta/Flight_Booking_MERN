import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchParams, setFlights } from '../../Features/flightSlice';
import axios from 'axios';
import backgroundImage from '../../assets/images/home3.jpg';
import CardsData from '../Cards/Cardsdata';
import Cards from '../Cards/Cards';
import TopAlinsCard from '../Cards/TopAlinsCard';
import AlinsCarddata from '../Cards/AlinsCarddata';
import Choseus from '../Cards/Choseus';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [tripType, setTripType] = useState('oneway');
  const [alertMessage, setAlertMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchFlights = async (event) => {
    event.preventDefault();
    const from = event.target.from.value.trim();
    const to = event.target.to.value.trim();
    const departureDate = event.target.departure ? event.target.departure.value : null;

    if (!from || !to) {
      setAlertMessage('Please fill in both the "From" and "To" fields.');
      return;
    }

    setAlertMessage(''); // Clear any existing alert messages

    try {
      // Dispatch the search parameters to the Redux store
      dispatch(setSearchParams({ from, to, departureDate, tripType }));

      // Fetch flights data from the API
      const response = await axios.get('https://jetquestsubhajit.netlify.app/api/flights');


      // Dispatch the fetched flights to the Redux store
      dispatch(setFlights(response.data));

      // Navigate to the Tickets page after fetching the flights
      navigate('/tickets');
    } catch (error) {
      console.error('Error fetching flights', error);
    }
  };

  return (
    <>
      <main className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 flex flex-col items-center mt-36">
          <div className="text-center text-blue-950"></div>
        </div>
        <div className="absolute inset-x-4 lg:inset-x-0 top-2/4 transform -translate-y-1/2 mx-auto max-w-md lg:max-w-4xl p-8 lg:p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">Book Your Flight</h2>

          {alertMessage && (
            <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
              {alertMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={searchFlights}>
            <fieldset className="mb-6">
              <legend className="text-gray-700 text-lg font-semibold mb-2">Trip Type</legend>
              <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                <label className="flex items-center">
                  <input type="radio" name="tripType" value="oneway" checked={tripType === 'oneway'} onChange={() => setTripType('oneway')} className="mr-2" />
                  <span className="text-gray-700">One-way</span>
                </label>
              </div>
            </fieldset>
            <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
              <div className="flex-1">
                <label htmlFor="from" className="block text-gray-700"><span className='text-red-600'>*</span> From:</label>
                <input type="text" id="from" name="from" placeholder="Departure City" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="flex-1">
                <label htmlFor="to" className="block text-gray-700"><span className='text-red-600'>*</span> To:</label>
                <input type="text" id="to" name="to" placeholder="Destination City" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="flex-1">
                <label htmlFor="departure" className="block text-gray-700">Departure Date (optional):</label>
                <input type="date" id="departure" name="departure" className="w-full p-2 border border-gray-300 rounded" />
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="px-6 py-2 text-white bg-blue-700 hover:bg-blue-900 rounded">
                Search Flights
              </button>
            </div>
          </form>
        </div>
      </main>
      <div className="mt-8 p-6">
        <h2 className="text-4xl text-center text-black-700 mb-6">Most Visited Places</h2>
        <div className="container mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CardsData.map((val) => (
            <Cards key={val.id} imgSrc={val.imgSrc} link={val.link} heading1={val.heading1} heading2={val.heading2} btn={val.btn} />
          ))}
        </div>
      </div>
      <div className="mt-8 p-6">
        <h2 className="text-3xl font-bold text-center text-black-700 mb-6">Search Top Airlines</h2>
        <div className="container mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {AlinsCarddata.map((val) => (
            <TopAlinsCard
              key={val.id}
              imgSrc={val.imgSrc}
              link={val.link}
              heading1={val.heading1}
              heading2={val.heading2}
              btn={val.btn}
            />
          ))}
        </div>
      </div>

      <Choseus />
    </>
  );
}

export default Home;
