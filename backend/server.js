const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const validateEnv = require('./config/envValidation');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const flightsRouter = require('./routes/flights');
const reservationsRouter = require('./routes/reservations');
const notificationsRouter = require('./routes/notifications');

// Environment validation
const env = validateEnv();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Bağlantısı
mongoose.connect(env.MONGODB_URI).then(() => {
  console.log('MongoDB connection successful');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/flights', flightsRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/notifications', notificationsRouter);

// Error handling
app.use(errorHandler);

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 