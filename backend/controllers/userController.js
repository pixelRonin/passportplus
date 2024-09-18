// Importing the user model schema
const mongoose = require('mongoose');
const User = require('../models/usersModel');
const PassportApplication = require('../models/passportModel');
const Payment = require('../models/paymentsModel');
const Upload = require('../models/uploadsModel');
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

const logoutUser = (req, res) => {
  // Remove the token from the client-side (handled on the frontend).
  // Since JWT is stateless, we just inform the client to remove the token.
  res.clearCookie('token'); // If you're using cookies to store tokens
  res.status(200).json({ message: 'User logged out successfully' });
};

// Get user profile data
const fetchUserProfile = async (req, res) => {
  try {
    // Log the incoming request
    console.log('Fetching profile for userId:', req.userObjectId);

    const userId = req.userObjectId;
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found with ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Log user details retrieved
    console.log('User found:', user);

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

    console.log('User profile to be sent:', userProfile);

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
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

//COMMISSIONER CONTROLLERS 
const viewCommissionerSection = (req, res) => {
    // Logic to display the Commissioner of Oath's section
    res.status(200).json({ message: 'Commissioner of Oath section displayed' });
  };
  
  const approveCommissionerSection = (req, res) => {
    // Logic for approving or handling the section
    res.status(200).json({ message: 'Commissioner of Oath section approved' });
  };

  // User to Search for Commissioner 
  // WORKING 
  const searchCommissioners = async (req, res) => {
    try {
      const { search } = req.query; // Extract search query from request parameters
  
      if (!search || search.trim().length === 0) {
        return res.status(400).json({ message: 'Search query is required' });
      }
  
      // Search for commissioners
      const commissioners = await User.find({
        role: 'commissioner_of_oath', // Ensure you're only searching for commissioners
        $or: [
          { first_name: { $regex: search, $options: 'i' } },
          { last_name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }).exec();
  
      if (commissioners.length === 0) {
        return res.status(404).json({ message: 'No commissioners found' });
      }
  
      res.status(200).json(commissioners); // Return the list of commissioners
    } catch (error) {
      console.error('Error searching for commissioners:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
// WORKING 
  const displayApplicantInfo = async (req, res) => {
    try {
      const userId = req.userObjectId; // Use the userObjectId from the request object
  
      // Validate ObjectId format (if using Mongoose)
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.error(`Invalid ObjectId format: ${userId}`);
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
  
      // Find the user
      const user = await User.findById(userId).exec();
      if (!user) {
        console.error(`User not found with ID: ${userId}`);
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find passport application for the user
      const passportApplication = await PassportApplication.findOne({ user: userId }).exec();
  
      // Find user documents
      const documents = await Upload.findOne({ applicantId: userId }).exec();
  
      // Find payment information
      const payment = await Payment.findOne({ user: userId }).exec();
  
      res.json({
        user,
        passportApplication,
        documents,
        payment
      });
    } catch (error) {
      console.error('Error fetching applicant info:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const assignCommissioner = async (req, res) => {
    const { userId, commissionerId, applicationInfo } = req.body;
  
    try {
      // Validate ObjectId format for user and commissioner
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(commissionerId)) {
        return res.status(400).json({ message: 'Invalid user ID or commissioner ID format' });
      }
  
      // Find the user (applicant)
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the commissioner by commissionerId
      const commissioner = await User.findById(commissionerId);
      if (!commissioner || commissioner.role !== 'commissioner_of_oath') {
        return res.status(404).json({ message: 'Commissioner not found' });
      }
  
      // Create or update the commission assignment for the user
      const assignment = await CommissionAssignment.findOneAndUpdate(
        { user: userId },
        {
          user: userId,
          commissioner: commissionerId,
          applicationInfo, // Store application information
          status: 'Assigned',
        },
        { new: true, upsert: true }
      );
  
      // Optionally, you can notify the commissioner of the assignment (via email, etc.)
  
      res.status(200).json({ message: 'Commissioner assigned successfully', assignment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = {
    registerUser,
    loginUser,
    fetchUserProfile,
    updateUserProfile,
    viewCommissionerSection,
    approveCommissionerSection,
    searchCommissioners,
    displayApplicantInfo,
    assignCommissioner,
    logoutUser
};
