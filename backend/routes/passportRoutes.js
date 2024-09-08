const express = require('express');
const router = express.Router();
const passportController = require('../controllers/passportController'); // Update with actual path
const authenticateToken = require('../middleware/authMiddleware');

// Route to create a new passport application
router.post('/new', authenticateToken, passportController.createPassportApplication);


module.exports = router;
