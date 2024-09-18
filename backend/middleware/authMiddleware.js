const jwt = require('jsonwebtoken');
const User = require('../models/usersModel'); // Import the User model
require('dotenv').config();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired', refreshTokenRequired: true });
      }
      return res.status(403).json({ error: 'Invalid token' });
    }

    try {
      const user = await User.findById(decoded.userId).select('_id email role');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      req.userObjectId = user._id; // Attach the user's ObjectId
      req.user = user; // Optionally attach the user object
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to authenticate user' });
    }
  });
};

module.exports = authenticateToken;
