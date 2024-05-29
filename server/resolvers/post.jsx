const Post = require('../models/Post');

const postResolvers = {
  getPosts: async () => {
    return await Post.find().populate('author');
  },
  getPostById: async (id) => {
    return await Post.findById(id).populate('author');
  },
  addPost: async (args) => {
    const { title, body, author } = args;
    const post = new Post({ title, body, author });
    await post.save();
    return post;
  }
};

module.exports = postResolvers;
