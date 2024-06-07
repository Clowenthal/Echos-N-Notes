const mongoose = require('mongoose');  // Import mongoose
const dateFormat = require('../utils/dateFormat1');  // Import date formatting utility

const BlogPostSchema = new mongoose.Schema({  // Define the BlogPost schema
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // User field referencing User model
  title: { type: String, required: true },  // Title field
  content: { type: String, required: true },  // Content field
  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),  // Use date formatting utility for the date field
  },
  comments: [  // Comments array
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // User field in comment referencing User model
      content: { type: String, required: true },  // Content field in comment
      date: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),  // Use date formatting utility for the date field in comments
      },
    }
  ]
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);  // Export the BlogPost model

