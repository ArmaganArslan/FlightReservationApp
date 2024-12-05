import React, { useState, useEffect, useCallback } from 'react';
import axios from '../axios';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { useNotification } from '../context/NotificationContext';

import { formatTime, calculateDuration } from '../utils/dateUtils';
import LoadingSpinner from './common/LoadingSpinner';
import moment from 'moment';

const FlightList = () => {
  const { showNotification } = useNotification();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [direction, setDirection] = useState('A');

  const fetchFlights = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/flights', {
        params: {
          scheduleDate: moment().format('YYYY-MM-DD'),
          flightDirection: direction
        }
      });
      setFlights(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [direction]);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);
  
  const handleBooking = async (flight) => {
    try {
      const estimatedArrival = flight.arrivalTime || moment(flight.departureTime).add(2, 'hours').format();

      const reservation = {
        flightId: flight.id,
        flightDate: flight.scheduleDateTime,
        departureTime: flight.departureTime,
        arrivalTime: estimatedArrival,
        destination: flight.to,
        origin: flight.from,
        bookingReference: Math.random().toString(36).substring(2, 8).toUpperCase()
      };

      const response = await axios.post('/api/reservations', reservation);
      
      if (response.status === 201) {
        showNotification({
          type: 'success',
          title: 'Reservation Successful',
          message: `Your flight has been booked! Reference code: ${reservation.bookingReference}`
        });
      }
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Booking Failed',
        message: 'Could not complete your reservation. Please try again.'
      });
    }
  };

  // Uçuş kartı render fonksiyonu
  const renderFlightCard = (flight) => (
    <div key={flight.id} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium mb-4">
        {direction === 'D' ? `${flight.to} - ${flight.from}` : `${flight.from} - ${flight.to}`}
      </h3>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FaPlaneDeparture className="text-gray-500" />
              <span className="text-sm text-gray-500">Departure</span>
            </div>
            <p className="text-xl font-semibold">{formatTime(flight.departureTime)}</p>
            <p className="text-sm text-gray-500">
              Airport: {direction === 'D' ? flight.to : flight.from}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="w-20 h-[1px] bg-gray-300"></div>
            <div className="text-indigo-600">
              <svg className="w-5 h-5 transform rotate-90" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            <div className="w-20 h-[1px] bg-gray-300"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {calculateDuration(flight.departureTime, flight.arrivalTime)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FaPlaneArrival className="text-gray-500" />
              <span className="text-sm text-gray-500">Arrival</span>
            </div>
            <p className="text-xl font-semibold">{formatTime(flight.arrivalTime)}</p>
            <p className="text-sm text-gray-500">
              Airport: {direction === 'D' ? flight.from : flight.to}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div>
          <p className="text-purple-600 font-medium">Price: ${flight.price}</p>
          <p className="text-sm text-gray-500">Round Trip</p>
        </div>
        <button 
          className="bg-[#491a95] text-white px-8 py-3 rounded-full hover:opacity-90 transition-colors"
          onClick={() => handleBooking(flight)}
        >
          Book Flight
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-4 flex">
        <button 
          className={`px-6 py-2 rounded-l-full border-r border-white w-40 ${
            direction === 'A' ? 'text-white bg-[#491a95]' : 'text-[#491a95] bg-[#F3F0FA]'
          } transition-all duration-300`}
          onClick={() => setDirection('A')}
        >
          Arrivals
        </button>
        <button 
          className={`px-6 py-2 rounded-r-full w-40 ${
            direction === 'D' ? 'text-white bg-[#491a95]' : 'text-[#491a95] bg-[#F3F0FA]'
          } transition-all duration-300`}
          onClick={() => setDirection('D')}
        >
          Departures
        </button>
      </div>

      <div className="space-y-4">
        {loading && <LoadingSpinner />}
        {error && (
          <div className="text-center py-4 px-6 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        {!loading && !error && flights.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">No flights found for the selected criteria.</p>
          </div>
        )}
        {flights.map(renderFlightCard)}
      </div>
    </div>
  );
};

export default FlightList;
