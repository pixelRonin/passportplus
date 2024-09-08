/* The controllers do the work from the 
pointers adminRoutes (Magic happens here) */
// Initializing 'user', because ADMIN is a user (Super user)
const User = require('../models/usersModel');
// Importing the Passport Application Model
const PassportApplication = require('../models/passportModel');
// Importing the library jwt library for AA
const jwt = require('jsonwebtoken');
// Importing .env file
require('dotenv').config();

// Admin Login 
 const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find admin by email
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

// View ALL passport submission 
const getPassportApplications = async (req, res) => {
    try {
        // Fetch all passport applications from the database
        const applications = await PassportApplication.find().populate('user', 'name email');

        // Return the applications to the client
        res.status(200).json({
            message: 'Passport applications retrieved successfully',
            applications: applications
        });
    } catch (error) {
        console.error('Error retrieving passport applications:', error);
        res.status(500).json({
            message: 'Failed to retrieve passport applications',
            error: error.message
        });
    }


};

// Approve or reject a passport application
const updatePassportApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body; // 'approved' or 'rejected'

        // Validate the status
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Find the application by ID and update its status
        const updatedApplication = await PassportApplication.findByIdAndUpdate(
            applicationId,
            { status: status },
            { new: true } // Return the updated document
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Passport application not found' });
        }

        // Return the updated application to the client
        res.status(200).json({
            message: `Passport application ${status} successfully`,
            application: updatedApplication
        });
    } catch (error) {
        console.error('Error updating passport application status:', error);
        res.status(500).json({
            message: 'Failed to update passport application status',
            error: error.message
        });
    }
};

// Function to get the admin profile
const getAdminProfile = async (req, res) => {
    try {
      // Assuming req.user contains the admin's ObjectID
      const adminId = req.user && req.user.userId; // Ensure the admin ID is correctly passed from middleware
  
      if (!adminId) {
        return res.status(400).json({ error: 'Admin ID is missing from the request.' });
      }
  
      // Fetch the admin user by their ObjectID from the database
      const user = await User.findById(adminId);
  
      if (!user) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      // Respond with the admin's profile information
      const { first_name, last_name } = user;
      res.status(200).json({ data: { first_name, last_name } });
    } catch (error) {
      console.error('Error fetching admin profile:', error);
      res.status(500).json({ error: 'Failed to fetch admin profile' });
    }
  };
  



//REMEMBER TO ALWAYS EXPORT
module.exports = {
    loginAdmin,
    getPassportApplications,
    updatePassportApplicationStatus,
    getAdminProfile
}
