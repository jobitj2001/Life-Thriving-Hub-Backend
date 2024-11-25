const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

const adminAuth = (req, res, next) => {
  const { username, password } = req.headers;

  // Hardcoded admin credentials
  const adminUsername = 'admin';  // Expected username
  const adminPassword = 'Lth@lifethrivinghub@Gmail.com';  // Expected password

  if (username === adminUsername && password === adminPassword) {
    next(); // Proceed if credentials are correct
  } else {
    res.status(401).json({ message: 'Unauthorized' }); // Unauthorized error
  }
};

// Apply the adminAuth middleware to the bookings route
router.get('/api/bookings', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find(); // Fetch bookings from DB
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// POST route to create a booking
router.post('/api/bookings', async (req, res) => {
  const { name, contact, service, date, counsellor } = req.body;

  if (!name || !contact || !service || !date || !counsellor) {
    return res.status(400).json({ message: 'Missing required fields: name, contact, service, date or counsellor.' });
  }

  try {
    const newBooking = new Booking({ name, contact, service, date, counsellor });
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
});

module.exports = router;
