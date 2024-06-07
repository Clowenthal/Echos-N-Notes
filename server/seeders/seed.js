const mongoose = require('mongoose');  // Import mongoose
const connectDB = require('../config/connection');  // Import database connection function
const seedUsers = require('./userSeeder');  // Import user seeder
const seedBlogPosts = require('./blogPostSeeder');  // Import blog post seeder

const seedDatabase = async () => {  // Function to seed the database
  await connectDB();  // Connect to the database
  await seedUsers();  // Seed users
  await seedBlogPosts();  // Seed blog posts
  mongoose.connection.close();  // Close the database connection
  console.log("all seeded");
  process.exit();
};

seedDatabase();  // Call the seedDatabase function
