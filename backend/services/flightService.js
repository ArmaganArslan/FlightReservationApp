const axios = require('axios');
require('dotenv').config();
const moment = require('moment');

const API_BASE_URL = process.env.API_BASE_URL;
const headers = {
  'app_id': process.env.SCHIPHOL_APP_ID,
  'app_key': process.env.SCHIPHOL_APP_KEY,
  'Accept': 'application/json',
  'ResourceVersion': 'v4'
};

const flightService = {
  getFlights: async (params = {}) => {
    try {
      const queryParams = {
        includedelays: false,
        page: 0,
        sort: '+scheduleTime',
        ...params
      };

      const response = await axios.get(`${API_BASE_URL}/flights`, { 
        params: queryParams,
        headers 
      });

      const uniqueFlights = new Map();

      response.data.flights.forEach(flight => {
        const formatDateTime = (timeStr) => {
          if (!timeStr) return null;
          if (timeStr.includes('T')) return timeStr;
          if (timeStr.match(/^\d{2}:\d{2}(:\d{2})?$/)) {
            const baseDate = moment().format('YYYY-MM-DD');
            return `${baseDate}T${timeStr}`;
          }
          return null;
        };

        const departureTime = formatDateTime(
          flight.flightDirection === 'D' 
            ? flight.scheduleTime 
            : (flight.actualOffBlockTime || flight.publicEstimatedOffBlockTime || flight.scheduleTime)
        );

        let arrivalTime;
        if (flight.flightDirection === 'A') {
          arrivalTime = formatDateTime(
            flight.actualLandingTime || 
            flight.estimatedLandingTime || 
            flight.scheduleTime
          );
        } else {
          arrivalTime = formatDateTime(
            flight.estimatedLandingTime || 
            flight.publicEstimatedOffBlockTime
          );
        }

        const uniqueKey = `${flight.mainFlight}-${flight.route.destinations[0]}-${formatDateTime(flight.scheduleTime)}`;

        if (flight.mainFlight === flight.flightName || !uniqueFlights.has(uniqueKey)) {
          uniqueFlights.set(uniqueKey, {
            id: flight.id,
            flightNumber: flight.flightName,
            airline: flight.prefixIATA,
            from: flight.route.destinations[0],
            to: 'AMS',
            departureTime,
            scheduleDateTime: formatDateTime(flight.scheduleTime),
            arrivalTime,
            status: flight.publicFlightState?.flightStates[0] || 'SCH',
            terminal: flight.terminal,
            gate: flight.gate,
            price: Math.floor(Math.random() * (1000 - 200) + 200)
          });
        }
      });

      return Array.from(uniqueFlights.values());

    } catch (error) {
      console.error('Schiphol API Error:', error);
      throw error;
    }
  }
};

module.exports = flightService;
