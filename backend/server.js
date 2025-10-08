const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const championRoutes = require('./routes/championRoutes');
const superstarRoutes = require('./routes/superstarRoutes');
const searchRoutes = require('./routes/searchRoutes');
const config = require('./config/config');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, '../src')));

// API Routes
app.use('/api/champions', championRoutes);
app.use('/api/superstars', superstarRoutes);
app.use('/api/search', searchRoutes);

// Serve the main HTML file for all routes (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

module.exports = app;