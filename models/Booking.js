const mongoose = require('mongoose');

// Define the schema for a booking
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  counsellor: { type: String, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
