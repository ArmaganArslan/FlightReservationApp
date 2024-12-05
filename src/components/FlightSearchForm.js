import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from '../axios';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from 'react-icons/fa';
import { IoMdCalendar } from 'react-icons/io';
import { useNotification } from '../context/NotificationContext';

export default function FlightSearchForm({ onSearch }) {
  const { showNotification } = useNotification();
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      const params = {
        scheduleDate: departureDate ? moment(departureDate).format('YYYY-MM-DD') : undefined,
        route: from && to ? `${from}-${to}` : undefined,
        flightDirection: 'D'
      };

      const response = await axios.get('http://localhost:5000/api/flights', { params });
      
      if (onSearch) {
        onSearch(response.data);
      }

      showNotification({
        type: 'success',
        title: 'Flight Search',
        message: 'Flights found successfully!'
      });
    } catch (error) {
      console.error('Uçuş arama hatası:', error);
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Could not search for flights. Please try again.'
      });
    }
  };

  const handleTripTypeChange = (e, type) => {
    e.preventDefault();
    setIsRoundTrip(type === 'round');
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <FaPlane className="w-6 h-6" style={{ color: 'rgb(62, 62, 62)' }} />
        <h2 className="text-xl font-semibold">BOOK YOUR FLIGHT</h2>
        <div className="ml-auto flex">
          <button 
            type="button"
            className={`px-6 py-2 rounded-l-full border-r border-white w-32 ${isRoundTrip ? 'text-white' : 'text-[rgb(73,26,149)]'}`}
            style={{ 
              backgroundColor: isRoundTrip ? 'rgb(73, 26, 149)' : '#F3F0FA',
              transition: 'all 0.3s ease'
            }}
            onClick={(e) => handleTripTypeChange(e, 'round')}
          >
            Round trip
          </button>
          <button 
            type="button"
            className={`px-6 py-2 rounded-r-full w-32 ${!isRoundTrip ? 'text-white' : 'text-[rgb(73,26,149)]'}`}
            style={{ 
              backgroundColor: !isRoundTrip ? 'rgb(73, 26, 149)' : '#F3F0FA',
              transition: 'all 0.3s ease'
            }}
            onClick={(e) => handleTripTypeChange(e, 'one')}
          >
            One way
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative flex-1">
          <div className="flex items-center border-2 rounded-full md:rounded-l-full md:rounded-r-lg p-3 hover:border-[rgb(73,26,149)] focus-within:border-[rgb(73,26,149)] bg-white"
               style={{ marginRight: '-5px', borderColor: 'rgb(209, 213, 219)' }}>
            <FaPlaneDeparture className="w-6 h-6 ml-2" style={{ color: 'rgb(73, 26, 149)' }} />
            <input
              type="text"
              placeholder=""
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="outline-none w-full ml-2"
            />
          </div>
        </div>

        <div className="relative flex-1">
          <div className="flex items-center border-2 rounded-full md:rounded-r-full md:rounded-l-lg p-3 hover:border-[rgb(73,26,149)] focus-within:border-[rgb(73,26,149)] bg-white"
               style={{ marginLeft: '-5px', borderColor: 'rgb(209, 213, 219)' }}>
            <FaPlaneArrival className="w-6 h-6 ml-2" style={{ color: 'rgb(73, 26, 149)' }} />
            <input
              type="text"
              placeholder=""
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="outline-none w-full ml-2"
            />
          </div>
        </div>

        <div className="relative flex-1">
          <div className="flex items-center border-2 rounded-full md:rounded-l-full md:rounded-r-lg p-3 hover:border-[rgb(73,26,149)] focus-within:border-[rgb(73,26,149)]"
               style={{ marginRight: '-5px', borderColor: 'rgb(209, 213, 219)' }}>
            <IoMdCalendar className="w-6 h-6" style={{ color: 'rgb(73, 26, 149)' }} />
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              placeholderText=""
              className="outline-none w-full"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
          </div>
        </div>

        <div className="relative flex-1">
          <div className={`flex items-center border-2 rounded-full md:rounded-r-full md:rounded-l-lg p-3 hover:border-[rgb(73,26,149)] focus-within:border-[rgb(73,26,149)] transition-opacity duration-300 ${!isRoundTrip ? 'opacity-50 pointer-events-none' : ''}`}
               style={{ marginLeft: '-5px', borderColor: 'rgb(209, 213, 219)' }}>
            <IoMdCalendar className="w-6 h-6" style={{ color: !isRoundTrip ? 'rgb(156, 139, 185)' : 'rgb(73, 26, 149)' }} />
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              placeholderText=""
              className={`outline-none w-full ${!isRoundTrip ? 'cursor-not-allowed' : ''}`}
              dateFormat="dd/MM/yyyy"
              minDate={departureDate || new Date()}
              disabled={!departureDate || !isRoundTrip}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button 
          type="submit" 
          className="text-white px-6 py-3 rounded-full hover:opacity-90"
          style={{ backgroundColor: 'rgb(73, 26, 149)' }}
        >
          Show flights
        </button>
      </div>
    </form>
  );
}

