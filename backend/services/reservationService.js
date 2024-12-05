const Reservation = require('../models/Reservation');

const reservationService = {
  getAllReservations: async () => {
    return await Reservation.find().sort({ createdAt: -1 });
  },

  createReservation: async (reservationData) => {
    const reservation = new Reservation({
      ...reservationData,
      createdAt: new Date()
    });
    return await reservation.save();
  },

  deleteReservation: async (id) => {
    return await Reservation.findByIdAndDelete(id);
  }
};

module.exports = reservationService; 