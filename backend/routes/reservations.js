const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    console.error('Could not fetch reservations', error);
    res.status(500).json({ message: 'Could not fetch reservations', error: error.message });
  }
});

// Create a new reservation
router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation({
      ...req.body,
      createdAt: new Date()
    });
    
    await reservation.save();
    
    res.status(201).json({
      message: 'Reservation successful',
      bookingReference: reservation.bookingReference
    });
  } catch (error) {
    console.error('Rezervasyon hatası:', error);
    res.status(400).json({ message: 'Could not create reservation' });
  }
});

// Delete reservation endpoint
router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    
    res.json({ message: 'Reservation successfully deleted' });
  } catch (error) {
    console.error('Rezervasyon silme hatası:', error);
    res.status(500).json({ message: 'An error occurred while deleting the reservation' });
  }
});

module.exports = router; 