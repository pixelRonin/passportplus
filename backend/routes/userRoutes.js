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
router.get('/myprofile', authenticateToken, userController.fetchUserProfile);
router.patch('/update-profile', authenticateToken, userController.updateUserProfile);
router.get('/:userId', userController.displayApplicantInfo);

// COMMISSIONER ROUTES
// Route to view Commissioner of Oath's section
router.get('/commissioner-section',  userController.viewCommissionerSection);

// Route to approve content in Commissioner of Oath's section
router.post('/commissioner-approve', userController.approveCommissionerSection);

// Route to search for Commissioners of Oath
router.get('/search-commissioners', userController.searchCommissioners);



module.exports = router;
