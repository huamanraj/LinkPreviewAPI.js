const express = require('express');
const router = express.Router();
const User = require('../models/User');
const rateLimiter = require('../middleware/rateLimiter');
const auth = require('../middleware/auth');
const linkPreviewController = require('../controllers/linkPreviewController');
const userController = require('../controllers/userController');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected routes (require authentication)
router.post('/generate-key', auth, userController.generateApiKey);
router.get('/user', auth, userController.getUserInfo); // Changed from /user/:userId to /user
router.delete('/delete-key', auth, userController.deleteApiKey); // New route for deleting API key

// Link preview endpoint with rate limiting
router.post('/preview', rateLimiter, linkPreviewController.getLinkPreview);

module.exports = router;
