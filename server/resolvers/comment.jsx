const Comment = require('../models/Comment');

const commentResolvers = {
  getCommentsByPostId: async (postId) => {
    try {
      return await Comment.find({ post: postId }).populate('author').populate('post');
    } catch (err) {
      throw new Error('Error fetching comments');
    }
  },
  addComment: async ({ text, postId, author }) => {
    try {
      const comment = new Comment({ text, post: postId, author });
      return await comment.save();
    } catch (err) {
      throw new Error('Error adding comment');
    }
  }
};

module.exports = commentResolvers;
