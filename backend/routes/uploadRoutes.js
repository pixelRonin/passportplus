const express = require('express');
const router = express.Router();
const uploadFiles = require('../middleware/uploadMiddleware');
const uploadController = require('../controllers/uploadController');
const authenticateToken = require('../middleware/authMiddleware');

// Handle file upload
router.post('/file', authenticateToken, uploadFiles, uploadController.uploadFiles);

module.exports = router;
