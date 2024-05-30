const Post = require('../models/Post');

const resolvers = {
  Query: {
    getPosts: async () => await Post.find().populate('author'),
    getPost: async (_, { id }) => await Post.findById(id).populate('author'),
  },
  Mutation: {
    createPost: async (_, { title, content, authorId }) => {
      const newPost = new Post({
        title,
        content,
        author: authorId,
      });

      return await newPost.save();
    },
    updatePost: async (_, { id, title, content }) => {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      ).populate('author');
      
      return updatedPost;
    },
    deletePost: async (_, { id }) => {
      const post = await Post.findById(id);
      if (post) {
        await post.remove();
        return post;
      } else {
        throw new Error('Post not found');
      }
    },
  },
};

module.exports = resolvers;

