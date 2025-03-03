require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const customCors = require('./middleware/customCors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(customCors); // Replace the previous cors middleware with our custom implementation
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api', apiRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('LinkPreview API Service is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Specifically handle CORS errors
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      status: 'error',
      message: 'CORS error: Origin not allowed'
    });
  }
  
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
