const mongoose = require('mongoose');  // Import mongoose

const UserSchema = new mongoose.Schema({  // Define the User schema
  username: { type: String, required: true, unique: true },  // Username field
  email: { type: String, required: true, unique: true },  // Email field
  password: { type: String, required: true },  // Password field
  date: { type: Date, default: Date.now }  // Date field
});

module.exports = mongoose.model('User', UserSchema);  // Export the User model
