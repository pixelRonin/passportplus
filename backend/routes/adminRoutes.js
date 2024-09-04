/* Routes specifically for admin users */
// Importing the express.js framework
const express = require('express');
// Importing express router that handles routes
const router = express.Router();

//Exports controllers the routes are pointing to
const adminController = require('../controllers/adminController');

// Middleware
// Exports authMiddleware to provide protection to certain routes
const authenticateToken = require('../middleware/authMiddleware');


// Admin Login Route
router.post('/login', adminController.loginAdmin);

// View Passport Applications
router.get('/applications/requests', adminController.getPassportApplications);

// Approve or Update Passport Status
router.put('/applications/update/:id', adminController.updatePassportApplicationStatus);

// Route to get admin profile
router.get('/admin-profile', authenticateToken, adminController.getAdminProfile);


// Admin ADDS Other Admins

module.exports = router