const bcrypt = require('bcryptjs');  // Import bcrypt for hashing passwords
const User = require('../models/User');  // Import User model
const { signToken, AuthenticationError } = require('../utils/auth1');  // Import signToken and AuthenticationError from auth.js

// Function to register a new user
const registerUser = async (username, email, password) => {
  const existingUser = await User.findOne({ email });  // Check if user already exists
  if (existingUser) {
    throw new Error('User already exists');  // Throw error if user exists
  }

  const user = new User({ username, email, password });  // Create a new user instance
  const salt = await bcrypt.genSalt(10);  // Generate salt for hashing password
  user.password = await bcrypt.hash(password, salt);  // Hash the password
  await user.save();  // Save the user to the database
  const token = signToken(user);  // Generate token for the user
  return { user, token };  // Return the saved user and token
};

// Function to log in a user
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });  // Find user by email
  if (!user) {
    throw AuthenticationError;  // Throw authentication error if user not found
  }

  const isMatch = await bcrypt.compare(password, user.password);  // Compare password with hashed password
  if (!isMatch) {
    throw AuthenticationError;  // Throw authentication error if password does not match
  }

  const token = signToken(user);  // Generate token for the user
  return token;  // Return the token
};

// Function to get all users
const getUsers = async () => {
  return await User.find();  // Return all users
};

// Function to get user by ID
const getUserById = async (id) => {
  return await User.findById(id);  // Return user by ID
};

module.exports = {  // Export the functions
  registerUser,
  loginUser,
  getUsers,
  getUserById,
};

