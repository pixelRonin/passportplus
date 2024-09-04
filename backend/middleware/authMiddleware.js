const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err.message);
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        if (!user) {
            console.error('No user object found after verification');
            return res.status(403).json({ error: 'Token verification failed' });
        }

        console.log('Decoded user from JWT:', user);

        req.userObjectId = user.userObjectId || user.userId; // Adjust based on token payload
        req.user = user; // Attach entire user object if needed

        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
