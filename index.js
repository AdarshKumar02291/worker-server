const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./src/config/database');
const uploadRoutes = require('./src/api/routes/uploadRoutes');
const statusRoutes = require('./src/api/routes/statusRoutes');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDatabase();

// Routes
app.use('/api/upload', uploadRoutes);
// app.use('/api/status', statusRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing purposes