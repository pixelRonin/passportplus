const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Authenticate admin and get token
router.post('/signin', adminController.authenticateAdmin);

// Protected admin route
router.get('/admin-dashboard', authenticateToken, authorizeRole(['admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;
