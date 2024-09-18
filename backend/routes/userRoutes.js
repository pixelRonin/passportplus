const express = require('express');
// importing library that ensures routing
const router = express.Router();

// Exports controller for a route
const userController = require('../controllers/userController');

// Middleware
// Exports authMiddleware to provide protection to certain routes
const authenticateToken = require('../middleware/authMiddleware');

// USER ROUTES
// User Authentication Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser); 
router.post('/logout', userController.logoutUser); 


router.get('/myprofile', authenticateToken, userController.fetchUserProfile);
router.patch('/update-profile', authenticateToken, userController.updateUserProfile);
// Define the route for searching commissioners
router.get('/passport-application/:id', authenticateToken, userController.displayApplicantInfo);


// COMMISSIONER ROUTES
// Route to view Commissioner of Oath's section
router.get('/commissioner-section',  userController.viewCommissionerSection);

// router.get('/my-application:userId', authenticateToken, userController.displayApplicantInfo);

// Route to approve content in Commissioner of Oath's section
router.post('/commissioner-approve', userController.approveCommissionerSection);

// Define the route for searching commissioners
router.get('/search-commissioner', userController.searchCommissioners);

// Route for assigning a commissioner
router.post('/assign-commissioner', userController.assignCommissioner);



module.exports = router;
