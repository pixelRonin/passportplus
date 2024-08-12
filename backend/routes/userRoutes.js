// routes/userRoutes.js

const express = require('express');
const router = express.Router();
// Exports middleware
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
// Exports controller for a route
const userController = require('../controllers/userController');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser); // Updated route

// Apply authentication and role authorization for the remaining routes
router.use(authenticateToken);

// Routes available to authenticated users
router.get('/profile', userController.getUserProfile);

// Routes available to admins only
router.use(authorizeRole(['admin']));
router.get('/users', userController.listAllUsers);

module.exports = router;
