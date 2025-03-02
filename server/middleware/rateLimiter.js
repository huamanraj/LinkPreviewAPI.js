const User = require('../models/User');

// Rate limiter middleware: 60 requests per minute per API key
const rateLimiter = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is required' });
    }

    // Find the user that owns this API key
    const user = await User.findOne({ 'apiKeys.key': apiKey });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    
    // Find the specific API key in the user's list
    const keyIndex = user.apiKeys.findIndex(k => k.key === apiKey);
    
    if (keyIndex === -1 || !user.apiKeys[keyIndex].isActive) {
      return res.status(401).json({ error: 'API key is inactive or invalid' });
    }
    
    // Current minute timestamp (rounded down to the nearest minute)
    const now = new Date();
    const currentMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()).getTime().toString();
    
    // Check if we need to initialize the counter for this minute
    if (!user.apiKeys[keyIndex].requestCount.get(currentMinute)) {
      // Clean up old entries (optional, to prevent map from growing too large)
      const oneMinuteAgo = new Date(now.getTime() - 60000).getTime().toString();
      const requestCount = user.apiKeys[keyIndex].requestCount;
      
      for (const [timestamp] of requestCount.entries()) {
        if (timestamp < oneMinuteAgo) {
          requestCount.delete(timestamp);
        }
      }
      
      user.apiKeys[keyIndex].requestCount.set(currentMinute, 0);
    }
    
    // Get the current count for this minute
    const count = user.apiKeys[keyIndex].requestCount.get(currentMinute);
    
    // Check if the limit is exceeded
    if (count >= 60) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Maximum 60 requests per minute allowed.',
        resetAt: new Date(parseInt(currentMinute) + 60000)
      });
    }
    
    // Increment the counter
    user.apiKeys[keyIndex].requestCount.set(currentMinute, count + 1);
    await user.save();
    
    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    res.status(500).json({ error: 'Internal server error during rate limiting' });
  }
};

module.exports = rateLimiter;
