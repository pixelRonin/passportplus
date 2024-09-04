// Importing the user model schema
const User = require('../models/usersModel');
// Importing the application model for passport creation functions
const PassportApplication = require('../models/applicationsModel');
// Importing hashing library bcryptjs
const bcrypt = require('bcryptjs');
// Importing the library jwt library for AA
const jwt = require('jsonwebtoken');
// Importing .env file
require('dotenv').config();

// Handler for User REGISTRATION
const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Validate request body
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create and save the new user with the default role ('user')
        const newUser = new User({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password // Password will be hashed automatically by the pre-save middleware
        });

        await newUser.save();

        // Generate a JWT for the new user
        const token = newUser.generateAuthToken(); // Use the instance method
        

        // Send the JWT as part of the response
        res.status(201).json({
            message: 'User registered successfully',
            token // Send the JWT token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

        // Send response with JWT
        // Respond with token and role
    res.json({ token, role: user.role });
} catch (err) {
  console.error('Login Error:', err.message);
  res.status(500).json({ message: 'Server error' });
}
};

// Get user profile data
const fetchMyProfile = async (req, res) => {
  try {
    // Use req.userObjectId extracted from JWT token
    const userId = req.userObjectId;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Populate the user profile fields
    const userProfile = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      profile: {
        age: user.profile.age,
        gender: user.profile.gender,
        phone_number: user.profile.phone_number,
        province: user.profile.province,
        date_of_birth: user.profile.date_of_birth,
        place_of_birth: user.profile.place_of_birth
      }
    };

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Update user profile data
const updateUserProfile = async (req, res) => {
  try {
    // Use req.userObjectId extracted from JWT token
    const userId = req.userObjectId;

    const {
      first_name,
      last_name,
      email,
      age,
      gender,
      phone_number,
      province,
      date_of_birth,
      place_of_birth_village,
      place_of_birth_town,
      place_of_birth_province,
      place_of_birth_country
    } = req.body;

    // Update user profile fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        first_name,
        last_name,
        email,
        profile: {
          age,
          gender,
          phone_number,
          province,
          date_of_birth,
          place_of_birth: {
            village: place_of_birth_village,
            town: place_of_birth_town,
            province: place_of_birth_province,
            country: place_of_birth_country
          }
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// MAIN FUNCTIONALITY HANDLERS 

// Creates a new passport application and SUBMITS the form
// Working (DO NOT TOUCH)
const createPassportApplication = async (req, res) => {
  try {
    // Check if user information is present
    if (!req.user || !req.user.userId) {
      console.log('req.user:', req.user); // Log the entire req.user object
      if (req.user) {
        console.log('req.user.userId:', req.user.userId); // Log the userId property if req.user exists
      } else {
        console.log('req.user is undefined or null');
      }
      
      // Handle the case where req.user or req.user.userId is missing
      return res.status(403).json({ message: 'User information is missing' });
    } else {
      // Log when both req.user and req.user.userId exist
      console.log('User is authenticated:', req.user);
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
      correspondenceAddress,
      departureDetails,
      previousTravelDocument,
      declaration,
      ageConsent, // Added field
      evidenceOfCitizenship // Added field
    } = req.body;

    // Validate required fields
    if (!travelDocumentType || !height || !hairColor || !eyeColor || !occupation || !maritalStatus || !residentialAddress || !correspondenceAddress || !declaration) {
      return res.status(400).json({ message: 'Missing required fields' });
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
      correspondenceAddress,
      departureDetails,
      previousTravelDocument,
      declaration,
      ageConsent, // Added field
      evidenceOfCitizenship // Added field
    });

    // Save the new passport application to the database
    await newApplication.save();

    // Send a success response to the client
    res.status(201).json({
      message: 'New Passport Application Created!',
      applicationId: newApplication._id // Send back the ID of the newly created application
    });
  } catch (error) {
    console.error('Error creating passport application:', error);
    res.status(500).json({
      message: 'Failed to create passport application',
      error: error.message
    });
  }
};


  // Update an existing passport application
  const updatePassportApplication = async (req, res) => {
    res.status(200).json({
      message: 'Passport Application Updated!'
    })
  }

  // Gets passport application status
  const getApplicationStatus = async (req, res) => {
    res.status(200).json({
      message: 'Application Status Given!'
    })
  }

module.exports = {
    registerUser,
    loginUser,
    fetchMyProfile,
    updateUserProfile,
    createPassportApplication,
    updatePassportApplication,
    getApplicationStatus
};
