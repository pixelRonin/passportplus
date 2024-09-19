const jwt = require('jsonwebtoken');
const PassportApplication = require('../models/passportModel'); // Adjust the path according to your directory structure

const verifyTokenAndAttachPassportId = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract token from header
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have your secret key
    
    // Find passport application for the user
    const passportApplication = await PassportApplication.findOne({ user: decoded.userId }).exec();
    if (!passportApplication) {
      return res.status(404).json({ message: 'Passport application not found' });
    }

    // Attach passportId to the request object
    req.passportId = passportApplication._id;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error in middleware:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = verifyTokenAndAttachPassportId;
