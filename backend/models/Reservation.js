const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReservationSchema = new Schema({
  flightId: {
    type: String,
    required: true
  },
  flightDate: {
    type: Date,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  bookingReference: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  strictQuery: false // Mongoose 8.x için gerekli
});

module.exports = mongoose.model('Reservation', ReservationSchema); 