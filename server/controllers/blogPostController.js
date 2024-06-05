const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

const createBlogPost = async (userId, title, content) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const blogPost = new BlogPost({ user: userId, title, content });
  await blogPost.save();
  return blogPost;
};

const addCommentToBlogPost = async (postId, userId, content) => {
  const blogPost = await BlogPost.findById(postId);
  if (!blogPost) {
    throw new Error('Blog post not found');
  }

  const comment = { user: userId, content, date: new Date() };
  blogPost.comments.push(comment);
  await blogPost.save();
  return blogPost;
};

const getBlogPosts = async () => {
  return await BlogPost.find().populate('user comments.user');
};

const getBlogPostById = async (id) => {
  return await BlogPost.findById(id).populate('user comments.user');
};

module.exports = {
  createBlogPost,
  addCommentToBlogPost,
  getBlogPosts,
  getBlogPostById,
};
