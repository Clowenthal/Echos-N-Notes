// server/schema/resolvers.js
const { User, BlogPost } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
	Query: {
		users: async () => {
			return User.find().populate('blogPosts');
		},
		user: async (parent, { username }) => {
			return User.findOne({ username }).populate('blogPosts');
		},
		blogPosts: async (parent, { username }) => {
			const params = username ? { username } : {};
			return BlogPost.find(params).populate('author');
		},
		blogPost: async (parent, { blogPostId }) => {
			return BlogPost.findOne({ _id: blogPostId }).populate('author');
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);
			return { token, user };
		},
		addBlogPost: async (parent, args, { user }) => {
			if (user) {
				const blogPost = await BlogPost.create({ ...args, author: user._id });
				await User.findOneAndUpdate(
					{ _id: user._id },
					{ $addToSet: { blogPosts: blogPost._id } }
				);
				return blogPost;
			}
		},
		addComment: async (parent, { blogPostId, commentText, commentAuthor }) => {
			return BlogPost.findOneAndUpdate(
				{ _id: blogPostId },
				{
					$addToSet: { comments: { commentText, commentAuthor } },
				},
				{
					new: true,
					runValidators: true,
				}
			);
		},
		removeBlogPost: async (parent, { blogPostId }) => {
			return BlogPost.findOneAndDelete({ _id: blogPostId });
		},
		removeComment: async (parent, { blogPostId, commentId }) => {
			return BlogPost.findOneAndUpdate(
				{ _id: blogPostId },
				{ $pull: { comments: { _id: commentId } } },
				{ new: true }
			);
		},
	},
};

module.exports = resolvers;
