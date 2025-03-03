const cors = require('cors');

const customCors = (req, res, next) => {
  const allowedOrigins = [
    'https://linkpreviewapi.amanraj.me',
    'https://linkpreviewapijs.amanraj.me'
  ];
  
  // For development purposes (optional - remove in production)
  const devOrigins = [
    'http://localhost:3000', 
    'http://localhost:5173', 
    'http://127.0.0.1:5173', 
    'http://127.0.0.1:3000'
  ];
  
  // Combine origins for development (in production, you might want to remove devOrigins)
  const validOrigins = [...allowedOrigins, ...devOrigins];

  // Check if it's the /api/preview endpoint
  if (req.path === '/api/preview') {
    // Allow any origin for the preview endpoint
    cors()(req, res, next);
  } else {
    // For all other routes, restrict to allowed origins
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        
        if (validOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
      credentials: true
    })(req, res, next);
  }
};

module.exports = customCors;
