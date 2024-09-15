const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');

// API endpoint to fetch and combine data for Commissioner approval
router.get('/commissioner/:id',  verificationController.fetchCombinedDataForCommissioner);

// User assigning application to commissioner
router.post('/assign-commissioner/:applicationId', verificationController.assignCommissioner);

// Verification route
router.put('/commissioner-approve/:applicationId', verificationController.commissionerApprove);

// ADMIN CONTROLLERS



   

module.exports = router;