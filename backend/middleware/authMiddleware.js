const jwt = require('jsonwebtoken');
const User = require('../models/usersModel'); // Import the User model
require('dotenv').config();

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
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

        try {
            // Assuming the token contains a payload with a `userId` key
            const user = await User.findById(decoded.userId).select('_id email role');

            if (!user) {
                console.error('User not found with provided token');
                return res.status(404).json({ error: 'User not found' });
            }

            // Attach the user object and user ID to the request object
            req.user = user; // This contains the full user object
            req.userObjectId = user._id; // This contains the user's Object ID

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Error fetching user from database:', error.message);
            return res.status(500).json({ error: 'Failed to authenticate user' });
        }
    });
};

module.exports = authenticateToken;
