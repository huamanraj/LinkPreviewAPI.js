const cors = require('cors');

const customCors = (req, res, next) => {
  const allowedOrigins = [
    'https://linkpreviewapi.amanraj.me',
    'https://linkpreviewapijs.amanraj.me',
    'http://localhost:5173', 
    'http://localhost:3000', 
    'http://127.0.0.1:5173', 
    'http://127.0.0.1:3000'
  ];
  
  // Set CORS headers for preflight requests
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // For the preview endpoint, allow any origin
  if (req.path === '/api/preview' || req.originalUrl === '/api/preview') {
    return cors({
      origin: true, // Allow any origin
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    })(req, res, next);
  }

  // For other endpoints, only allow specific origins
  return cors({
    origin: function (origin, callback) {
      // Allow server-to-server requests (no origin)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // Instead of throwing an error, send a proper CORS response
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  })(req, res, next);
};

module.exports = customCors;
