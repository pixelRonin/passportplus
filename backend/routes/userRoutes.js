const express = require('express');
// importing library that ensures routing
const router = express.Router();

// Exports controller for a route
const userController = require('../controllers/userController');

// Middleware
// Exports authMiddleware to provide protection to certain routes
const authenticateToken = require('../middleware/authMiddleware');

// USER ROUTES
// Public Routes

// User Authentication Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser); 


// Use the middleware in your route
router.get('/myprofile', authenticateToken, userController.fetchUserProfile);
router.post('/update-profile', authenticateToken, userController.updateUserProfile);


module.exports = router;
