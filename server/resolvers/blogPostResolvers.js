const blogPostController = require('../controllers/blogPostController');  // Import blogPostController

const blogPostResolvers = {  // Define blog post resolvers
  Query: {
    blogPosts: async () => await blogPostController.getBlogPosts(),  // Resolver to get all blog posts
    blogPost: async (_, { id }) => await blogPostController.getBlogPostById(id),  // Resolver to get blog post by ID
  },
  Mutation: {
    addBlogPost: async (_, { userId, title, content }) => {
      return await blogPostController.createBlogPost(userId, title, content);  // Resolver to add a new blog post
    },
    addComment: async (_, { postId, userId, content }) => {
      return await blogPostController.addCommentToBlogPost(postId, userId, content);  // Resolver to add a comment to a blog post
    },
  },
};

module.exports = blogPostResolvers;  // Export blog post resolvers
