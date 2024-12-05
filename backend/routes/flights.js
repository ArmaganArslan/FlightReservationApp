const express = require('express');
const router = express.Router();
const flightService = require('../services/flightService');
const moment = require('moment');

// Tüm flights get
router.get('/', async (req, res) => {
  try {
    const { departureDate, returnDate, from, to } = req.query;
    
    const params = {
      scheduleDate: departureDate ? moment(departureDate).format('YYYY-MM-DD') : undefined,
      route: from && to ? `${from}-${to}` : undefined,
      flightDirection: req.query.flightDirection
    };

    const flights = await flightService.getFlights(params);
    res.json(flights);

  } catch (error) {
    console.error('Flight route error:', error);
    res.status(500).json({ error: 'An error occurred while fetching flight information' });
  }
});

module.exports = router;
