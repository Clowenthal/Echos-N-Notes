// server/seeders/seed.js
const mongoose = require('mongoose');
const db = require('../config/connection');
const { User, BlogPost } = require('../models');
const commentPostSeeds = require('./commentPost.json');
const seederSeeds = require('./seeder.json');
const cleanDB = require('./cleanDB');

// Ensure we wait for the connection to be open before proceeding
db.on('error', (err) => {
  console.error(err);
});

db.once('open', async () => {
  try {
    console.log('Cleaning database...');
    await cleanDB('BlogPost', 'blogposts');
    await cleanDB('User', 'users');

    console.log('Seeding users...');
    // Seed users from seederSeeds
    await User.create(seederSeeds);

    console.log('Seeding blog posts and comments...');
    // Create blog posts and associate comments with blog posts
    for (let i = 0; i < commentPostSeeds.length; i++) {
      const { blogPostComment, blogPostAuthor } = commentPostSeeds[i];

      // Find the user by blogPostAuthor
      let user = await User.findOne({ username: blogPostAuthor });

      // Ensure the user exists
      if (!user) {
        console.error(`User with username ${blogPostAuthor} not found`);
        continue;
      }

      // Create a new blog post with the user's ObjectId
      let blogPost = await BlogPost.create({
        author: user._id, // Use the user's ObjectId
        title: `Title by ${blogPostAuthor}`, // Adding dummy title
        content: `Content by ${blogPostAuthor}`, // Adding dummy content
        comments: []
      });

      // Associate the blog post with the user
      await User.findOneAndUpdate(
        { username: blogPostAuthor },
        {
          $addToSet: {
            blogPosts: blogPost._id,
          },
        }
      );

      // Add comment to blog post
      blogPost.comments.push({
        commentText: blogPostComment,
        commentAuthor: blogPostAuthor
      });
      await blogPost.save();
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
});
