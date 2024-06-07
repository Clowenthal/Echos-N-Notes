const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    token: { type: GraphQLString },
  }),
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: UserType },
    content: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

const BlogPostType = new GraphQLObjectType({
  name: 'BlogPost',
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: UserType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    date: { type: GraphQLString },
    comments: { type: new GraphQLList(CommentType) },
  }),
});

module.exports = { UserType, BlogPostType, CommentType, TokenType };
