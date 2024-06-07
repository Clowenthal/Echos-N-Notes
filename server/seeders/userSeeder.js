const bcrypt = require('bcryptjs');  // Import bcrypt for hashing passwords
const User = require('../models/User');  // Import User model
const seedData = require('./seeder.json');  // Import seed data

const seedUsers = async () => {  // Function to seed users
  try {
    await User.deleteMany({});  // Delete all existing users
    for (const user of seedData.users) {  // Iterate over seed data
      const salt = await bcrypt.genSalt(10);  // Generate salt for hashing password
      user.password = await bcrypt.hash(user.password, salt);  // Hash the password
      await new User(user).save();  // Save the user to the database
    }
    console.log('Users seeded!');  // Log success message
  } catch (err) {
    console.error(err);  // Log error message
  }
};

module.exports = seedUsers;  // Export the seedUsers function
