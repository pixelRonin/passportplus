/* The controllers do the work from the 
pointers adminRoutes (Magic happens here) */
const mongoose = require('mongoose');
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

// Controller to add a user as Commissioner of Oath
const addCommissioner = async (req, res) => {
    try {
        const { userId } = req.body; // Extract the user ID from the request body

        // Step 1: Find the user by ID
        const user = await User.findById(userId);

        // Step 2: Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Step 3: Update the user's role to 'Commissioner of Oath'
        user.role = 'commissioner_of_oath';
        
        // Step 4: Save the updated user in the database
        await user.save();

        // Respond with a success message
        return res.status(200).json({ success: 'User has been assigned as Commissioner of Oath' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while assigning the role' });
    }
};

const searchUser = async (req, res) => {
    try {
        const { query } = req.query;
        console.log(`Received search query: ${query}`); // Log the incoming query

        if (!query || query.trim() === '') {
            return res.status(400).json({ error: 'Search query is required' });
        }

        // Constructing the MongoDB query
        const searchQuery = {
            $or: [
                { first_name: { $regex: query, $options: 'i' } },
                { last_name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        };

        console.log('MongoDB search query:', JSON.stringify(searchQuery, null, 2)); // Log the MongoDB query

        const users = await User.find(searchQuery).select('first_name last_name email phone_number age _id');

        console.log(`Users found: ${users.length}`); // Log the number of users found

        return res.status(200).json({ users });
    } catch (error) {
        console.error('Error searching users:', error);
        return res.status(500).json({ error: 'An error occurred while searching for users' });
    }
};

const adminApproveApplication = async (req, res) => {
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
        return res.status(400).json({ message: 'Invalid application ID format' });
    }

    try {
        const application = await PassportApplication.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (!application.isCommissionerApproved) {
            return res.status(400).json({ message: 'Application must be approved by commissioner first' });
        }

        application.isAdminApproved = true;
        await application.save();

        res.status(200).json({ message: 'Application approved by admin' });
    } catch (error) {
        console.error('Error approving application by admin:', error);
        res.status(500).json({ message: 'Failed to approve application by admin' });
    }
};

const fetchAllUserApplications = async (req, res) => {
    try {
      // Fetch all users with the role of "user"
      const users = await User.find({ role: 'user' }).exec();
      
      if (!users || users.length === 0) {
        console.log('No users with role "user" found');
        return res.status(404).json({ message: 'No users found with the specified role' });
      }
  
      // Fetch passport applications, documents, and payment information for each user
      const userApplications = await Promise.all(users.map(async (user) => {
        const userId = user._id.toString();
  
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          console.error(`Invalid ObjectId format: ${userId}`);
          return null;
        }
  
        // Fetch passport application for the user
        const passportApplication = await PassportApplication.findOne({ user: userId }).exec();
  
        // Fetch user documents
        const documents = await Upload.findOne({ applicantId: userId }).exec();
  
        // Fetch payment information
        const payment = await Payment.findOne({ user: userId }).exec();
  
        return {
          user,
          passportApplication,
          documents,
          payment: payment ? {
            amount: payment.amount,
            currency: payment.currency,
            status: payment.status,
            receiptUrl: payment.receiptUrl || 'N/A', // In case there's no receipt URL
            createdAt: payment.createdAt
          } : null // Return null if no payment data is found
        };
      }));
  
      // Filter out null entries (in case some users had invalid IDs)
      const validUserApplications = userApplications.filter(app => app !== null);
  
      // Construct the response with all necessary details
      res.json(validUserApplications);
    } catch (error) {
      console.error('Error fetching all user applications:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  


//REMEMBER TO ALWAYS EXPORT
module.exports = {
    loginAdmin,
    addCommissioner,
    searchUser,
    adminApproveApplication,
    fetchAllUserApplications
}
