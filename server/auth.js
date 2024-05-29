const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};

module.exports = auth;
