const jwt = require('jsonwebtoken');

const paymentMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  // Check if the token is a Bearer token
  if (!token.startsWith('Bearer ')) {
    return res.status(401).send('Invalid token format. Expected "Bearer <token>".');
  }

  // Remove the "Bearer " prefix from the token
  const cleanToken = token.substring(7);

  try {
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      res.status(400).send('Invalid token.');
    } else if (err.name === 'TokenExpiredError') {
      res.status(401).send('Token has expired.');
    } else {
      res.status(500).send('An error occurred while verifying the token.');
    }
  }
};

module.exports = paymentMiddleware;