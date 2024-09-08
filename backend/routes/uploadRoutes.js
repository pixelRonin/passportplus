// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/uploadMiddleware');

// Handle multiple files upload
router.post('/file', upload.fields([
    { name: 'image1', maxCount: 1 },  // Field name for the first image
    { name: 'image2', maxCount: 1 },  // Field name for the second image
    { name: 'pdf', maxCount: 1 }      // Field name for the PDF
]), uploadController.uploadFiles);

module.exports = router;