const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: 'Token is required' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    if (!user) {
      console.error('No user object found after verification');
      return res.status(403).json({ error: 'Token verification failed' });
    }

    // Attach user info to request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;