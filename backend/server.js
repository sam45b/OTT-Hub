const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Import route files
const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS for frontend access
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL when deploying
}));

// Routes setup
app.use('/auth', authRoutes);
app.use('/api', subscriptionRoutes);
app.use('/transactions', transactionRoutes);
app.use('/admin', adminRoutes);

// MongoDB Database connection using environment variables
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful DB connection
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.log('MongoDB connection error:', err));
