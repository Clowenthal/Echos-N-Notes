const { User, BlogPost } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('blogpost');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('blogposts');
    },
    blogposts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return BlogPost.find(params).sort({ createdAt: -1 });
    },
    blogpost: async (parent, { blogpostId }) => {
      return BlogPost.findOne({ _id: postId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parent, { blogComment, blogAuthor }) => {
      const post = await BlogPost.create({ blogComment, blogAuthor });

      await User.findOneAndUpdate(
        { username: blogAuthor },
        { $addToSet: { posts: post._id } }
      );

      return post;
    },
    addComment: async (parent, { postId, commentText, commentAuthor }) => {
      return BlogPost.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removePost: async (parent, { postId }) => {
      return BlogPost.findOneAndDelete({ _id: postId });
    },
    removeComment: async (parent, { postId, commentId }) => {
      return BlogPost.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
