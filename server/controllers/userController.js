const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { 
    expiresIn: process.env.JWT_EXPIRY 
  });
};

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    
    if (!email || !name || !password) {
      return res.status(400).json({ error: 'Email, name, and password are required' });
    }
    
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
    
    // Create new user
    user = new User({
      email,
      name,
      password
    });
    
    await user.save();
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,
      token
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      token
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
};

// Generate a new API key for an existing user
const generateApiKey = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required for the API key' });
    }

    // User is already attached to request from auth middleware
    const user = req.user;
    
    const apiKey = user.generateApiKey(title);
    await user.save();
    
    res.status(200).json({
      message: 'New API key generated successfully',
      apiKey,
      title
    });
  } catch (error) {
    console.error('Error generating API key:', error);
    res.status(500).json({ error: 'Error generating API key' });
  }
};

// Delete an API key for an existing user
const deleteApiKey = async (req, res) => {
  try {
    const { apiKey } = req.body;
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    // User is already attached to request from auth middleware
    const user = req.user;

    // Find the API key and remove it
    const keyIndex = user.apiKeys.findIndex(key => key.key === apiKey);
    if (keyIndex === -1) {
      return res.status(404).json({ error: 'API key not found' });
    }

    user.apiKeys.splice(keyIndex, 1);
    await user.save();

    res.status(200).json({ message: 'API key deleted successfully' });
  } catch (error) {
    console.error('Error deleting API key:', error);
    res.status(500).json({ error: 'Error deleting API key' });
  }
};

// Get user information including API keys
const getUserInfo = async (req, res) => {
  try {
    // User is already attached to request from auth middleware
    const user = req.user;
    
    // Include complete API key information
    const apiKeys = user.apiKeys.map(key => ({
      key: key.key,
      title: key.title, // Include the title of the API key
      createdAt: key.createdAt,
      isActive: key.isActive
    }));
    
    res.status(200).json({
      userId: user._id,
      email: user.email,
      name: user.name,
      apiKeys,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user information' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  generateApiKey,
  deleteApiKey,
  getUserInfo
};
