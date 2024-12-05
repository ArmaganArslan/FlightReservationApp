const mongoose = require('mongoose');
const { Schema } = mongoose;

const FlightSchema = new Schema({
  flightId: {
    type: String,
    required: true,
    unique: true
  },
  flightName: {
    type: String,
    required: true
  },
  flightNumber: {
    type: Number,
    required: true
  },
  airline: {
    prefixIATA: String,
    prefixICAO: String,
    airlineCode: Number
  },
  aircraft: {
    registration: String,
    type: {
      iataMain: String,
      iataSub: String
    }
  },
  schedule: {
    date: String,
    time: String,
    dateTime: Date
  },
  times: {
    scheduled: Date,
    estimated: Date,
    actual: Date,
    lastUpdated: Date
  },
  route: {
    destinations: [String],
    eu: String,
    visa: Boolean
  },
  terminal: {
    type: Number
  },
  gate: {
    type: String
  },
  pier: {
    type: String
  },
  baggageBelt: {
    type: [String]
  },
  status: {
    flightStates: [String],
    isOperational: Boolean
  },
  codeshares: [String],
  serviceType: String,
  schemaVersion: String
}, { 
  strictQuery: false
});

module.exports = mongoose.model('Flight', FlightSchema); 