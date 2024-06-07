const userResolvers = require('./userResolvers');  // Import user resolvers
const blogPostResolvers = require('./blogPostResolvers');  // Import blog post resolvers

module.exports = {
  Query: {
    ...userResolvers.Query,  // Combine user queries
    ...blogPostResolvers.Query  // Combine blog post queries
  },
  Mutation: {
    ...userResolvers.Mutation,  // Combine user mutations
    ...blogPostResolvers.Mutation  // Combine blog post mutations
  }
};
