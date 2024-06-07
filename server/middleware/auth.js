const jwt = require('jsonwebtoken');  // Import JSON web token library
require('dotenv').config();  // Load environment variables

// Middleware function to authenticate requests
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');  // Get token from header
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });  // Return error if no token
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token
    req.user = decoded.user;  // Set user in request object
    next();  // Call next middleware
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });  // Return error if token is not valid
  }
};

module.exports = auth;  // Export the auth middleware function
