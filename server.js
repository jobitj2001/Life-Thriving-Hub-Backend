const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection string
mongoose.connect('mongodb+srv://lifethrivinghub:lth@lth.15ldj.mongodb.net/bookingDB?retryWrites=true&w=majority&appName=LTH', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Use the booking routes
app.use(bookingRoutes);

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
