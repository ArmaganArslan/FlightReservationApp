import React, { useState, useEffect } from 'react';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { IoMdCalendar } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import axios from '../axios';
import moment from 'moment';
import PromoCards from './PromoCards';
import { useNotification } from '../context/NotificationContext';

function MyFlights() {
  const { showNotification } = useNotification();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/api/reservations');
        setFlights(response.data.map(reservation => ({
          id: reservation._id,
          from: reservation.origin,
          to: reservation.destination,
          departureTime: moment(reservation.departureTime).format('HH:mm'),
          arrivalTime: moment(reservation.arrivalTime).format('HH:mm'),
          date: moment(reservation.flightDate).format('YYYY-MM-DD'),
          bookingReference: reservation.bookingReference
        })));
      } catch (err) {
        setError('An error occurred while loading reservations');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleDeleteReservation = async (id) => {
    showNotification({
      type: 'warning',
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this reservation?',
      actions: [
        {
          label: 'Delete',
          onClick: async () => {
            try {
              await axios.delete(`/api/reservations/${id}`);
              setFlights(flights.filter(flight => flight.id !== id));
              
              showNotification({
                type: 'success',
                title: 'Reservation Deleted',
                message: 'Your reservation has been successfully cancelled.'
              });
            } catch (err) {
              showNotification({
                type: 'error',
                title: 'Error',
                message: 'An error occurred while deleting the reservation'
              });
            }
          }
        },
        {
          label: 'Cancel',
          onClick: () => {}
        }
      ]
    });
  };

  const renderFlightCard = (flight) => (
    <div 
      key={flight.id} 
      className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-[#491a95]"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <IoMdCalendar className="text-[#491a95] text-xl" />
              <span className="text-gray-600">{flight.date}</span>
            </div>
            <span className="text-sm text-gray-500">
              Ref: {flight.bookingReference}
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FaPlaneDeparture className="text-gray-500" />
                <span className="text-sm text-gray-500">Departure</span>
              </div>
              <p className="text-lg font-semibold">{flight.departureTime}</p>
              <p className="text-sm text-gray-600">{flight.from}</p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="w-full flex items-center gap-2">
                <div className="h-[2px] flex-1 bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="h-[2px] flex-1 bg-gray-300"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <FaPlaneArrival className="text-gray-500" />
                <span className="text-sm text-gray-500">Arrival</span>
              </div>
              <p className="text-lg font-semibold">{flight.arrivalTime}</p>
              <p className="text-sm text-gray-600">{flight.to}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDeleteReservation(flight.id)}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
            title="Cancel Reservation"
          >
            <span>Cancel Reservation</span>
            <MdCancel className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-3/4">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">My Flights</h2>
          <p className="text-gray-600">You can manage all your flight reservations here.</p>
        </div>

        <div className="space-y-4">
          {loading && <div className="text-center py-4">Loading...</div>}
          {error && <div className="text-red-500 text-center py-4">{error}</div>}
          {!loading && !error && flights.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">You don't have any flight reservations yet.</p>
            </div>
          )}
          {flights.map(renderFlightCard)}
        </div>
      </div>

      <div className="lg:w-1/4 space-y-4">
        <PromoCards />
      </div>
    </div>
  );
}

export default MyFlights; 