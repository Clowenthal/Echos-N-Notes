const Comment = require('../models/Comment');

const resolvers = {
  Query: {
    getComments: async (_, { postId }) => await Comment.find({ post: postId }).populate('author').populate('post'),
  },
  Mutation: {
    createComment: async (_, { content, authorId, postId }) => {
      const newComment = new Comment({
        content,
        author: authorId,
        post: postId,
      });

      return await newComment.save();
    },
    updateComment: async (_, { id, content }) => {
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      ).populate('author').populate('post');
      
      return updatedComment;
    },
    deleteComment: async (_, { id }) => {
      const comment = await Comment.findById(id);
      if (comment) {
        await comment.remove();
        return comment;
      } else {
        throw new Error('Comment not found');
      }
    },
  },
};

module.exports = resolvers;

