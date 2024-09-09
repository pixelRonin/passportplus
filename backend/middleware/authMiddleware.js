const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Handle token expiration specifically
            if (err.name === 'TokenExpiredError') {
                console.error('Token expired:', err.message);
                return res.status(401).json({ error: 'Token expired', refreshTokenRequired: true });
            }

            // Handle other errors
            console.error('Token verification failed:', err.message);
            return res.status(403).json({ error: 'Invalid token' });
        }

        // Adjust this based on your token payload structure
        req.userObjectId = user.userId; // Match the payload key from token generation
        req.user = user; // Attach the entire user object if needed

        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
