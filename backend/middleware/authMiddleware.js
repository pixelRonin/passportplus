const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = await User.findById(user.id);
        next();
    });
};

const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            res.sendStatus(403); // Forbidden
        }
    };
};

module.exports = { authenticateToken, authorizeRole };
