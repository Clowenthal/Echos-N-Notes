// server/models/BlogPost.js
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  commentAuthor: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const blogPostSchema = new Schema({
  title: {
    type: String,
    required: 'You need to provide a title!',
    trim: true,
  },
  content: {
    type: String,
    required: 'You need to provide content!',
    minlength: 1,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [commentSchema],
});

const BlogPost = model('BlogPost', blogPostSchema);

module.exports = BlogPost;