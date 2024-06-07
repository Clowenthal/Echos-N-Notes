const BlogPost = require('../models/BlogPost');  // Import BlogPost model
const User = require('../models/User');  // Import User model
const seedData = require('./seeder.json');  // Import seed data
const db = require('../config/connection');

const seedBlogPosts = async () => {  // Function to seed blog posts
  try {
    await BlogPost.deleteMany({});  // Delete all existing blog posts
    for (const post of seedData.blogPosts) {  // Iterate over seed data
      const user = await User.findOne({ email: post.userEmail });  // Find user by email
      post.user = user._id;  // Set user ID in blog post
      await new BlogPost(post).save();  // Save the blog post to the database
    }
    console.log('Blog posts seeded!');  // Log success message
  } catch (err) {
    console.error(err);  // Log error message
  }
};

module.exports = seedBlogPosts;  // Export the seedBlogPosts function
