const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');  // Import GraphQL types

const UserType = new GraphQLObjectType({  // Define User type
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },  // ID field
    username: { type: GraphQLString },  // Username field
    email: { type: GraphQLString },  // Email field
  }),
});

const TokenType = new GraphQLObjectType({  // Define Token type
  name: 'Token',
  fields: () => ({
    token: { type: GraphQLString },  // Token field
  }),
});

const CommentType = new GraphQLObjectType({  // Define Comment type
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },  // ID field
    user: { type: UserType },  // User field
    content: { type: GraphQLString },  // Content field
    date: { type: GraphQLString },  // Date field
  }),
});

const BlogPostType = new GraphQLObjectType({  // Define BlogPost type
  name: 'BlogPost',
  fields: () => ({
    id: { type: GraphQLID },  // ID field
    user: { type: UserType },  // User field
    title: { type: GraphQLString },  // Title field
    content: { type: GraphQLString },  // Content field
    date: { type: GraphQLString },  // Date field
    comments: { type: new GraphQLList(CommentType) },  // Comments field
  }),
});

module.exports = { UserType, BlogPostType, CommentType, TokenType };  // Export GraphQL types

