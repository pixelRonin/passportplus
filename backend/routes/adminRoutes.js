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
const adminCheck = require('../middleware/admincheckMiddleware')


// AUTHENTICATION Route
router.post('/login', authenticateToken, adminController.loginAdmin);

// Functionality Routes
// add a user as Commissioner of Oath
router.post('/add-commissioner', adminController.addCommissioner);
// search the  database for a user
// Endpoint to search for users
router.get('/search-user', adminController.searchUser);

module.exports = router