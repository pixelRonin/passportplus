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

// CORE FUNCTIONALITIES

// Creating a new passport (Protected Route)
router.post('/applications/new', authenticateToken, userController.createPassportApplication);

// Update an existing passport application
router.put('/applications/:id/update', userController.updatePassportApplication);

// Update an existing passport application
router.get('/applications/:id/status', userController.getApplicationStatus);

//DELETE an Application

//READ an Application 

module.exports = router;
