const jwt = require('jsonwebtoken');
const User = require('../models/usersModel'); // Adjust the path as necessary

// Middleware to check if the user is an Administrator
exports.adminCheck = (req, res, next) => {
    if (req.user.role !== 'Administrator') {
        return res.status(403).json({ error: 'Access denied, requires Administrator role' });
    }
    next();
}