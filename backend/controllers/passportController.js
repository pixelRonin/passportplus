const PassportApplication = require('../models/passportModel');
const jwt = require('jsonwebtoken');

const createPassportApplication = async (req, res) => {
  try {
    // Check if user information is present
    if (!req.user || !req.user.userId) {
      console.log('req.user:', req.user); // Log the entire req.user object
      return res.status(403).json({ message: 'User information is missing' });
    }

    // Extract data from the request body
    const {
      travelDocumentType,
      height,
      hairColor,
      eyeColor,
      occupation,
      maritalStatus,
      residentialAddress,
      ageConsent,
      departureDetails,
      evidenceOfCitizenship,
      declaration
    } = req.body;

    // Validate required fields
    if (
      !travelDocumentType || !height || !hairColor || !eyeColor ||
      !occupation || !maritalStatus || !residentialAddress || declaration === undefined
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Additional validations for nested fields
    if (maritalStatus === 'Single' && ageConsent && ageConsent.isUnder17 && !ageConsent.consentDetails) {
      return res.status(400).json({ message: 'Guardian consent is required for single applicants under 17' });
    }

    // Ensure evidence of citizenship fields are correctly provided
    const { parentInfo, citizenshipQuestions } = evidenceOfCitizenship || {};
    if (!parentInfo || !citizenshipQuestions) {
      return res.status(400).json({ message: 'Missing evidence of citizenship details' });
    }

    // Create a new passport application document
    const newApplication = new PassportApplication({
      user: req.user.userId,
      travelDocumentType,
      height,
      hairColor,
      eyeColor,
      occupation,
      maritalStatus,
      residentialAddress,
      ageConsent,
      departureDetails,
      evidenceOfCitizenship,
      declaration
    });

    // Save the new passport application to the database
    await newApplication.save();

    // Send a success response to the client
    res.status(201).json({
      message: 'New Passport Application Created!',
      applicationId: newApplication._id
    });
  } catch (error) {
    console.error('Error creating passport application:', error); // Log complete error details
    res.status(500).json({
      message: 'Failed to create passport application',
      error: error.message
    });
  }
};

// Export the controller function
module.exports = {
  createPassportApplication
};
