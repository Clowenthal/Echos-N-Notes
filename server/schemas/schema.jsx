const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = require('graphql');
const UserType = require('../models/User');
const PostType = require('../models/Post');
const CommentType = require('../models/Comment'); // Import the CommentType
const userResolvers = require('../resolvers/user');
const postResolvers = require('../resolvers/post');
const commentResolvers = require('../resolvers/comment'); // Import the comment resolvers

const AuthPayloadType = new GraphQLObjectType({
  name: 'AuthPayload',
  fields: {
    token: { type: GraphQLString },
    user: { type: UserType }
  }
});

const CommentGraphQLType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    author: { type: UserType },
    post: { type: PostType }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return userResolvers.getUsers();
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return postResolvers.getPosts();
      }
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return postResolvers.getPostById(args.id);
      }
    },
    comments: {
      type: new GraphQLList(CommentGraphQLType),
      args: { postId: { type: GraphQLID } },
      resolve(parent, args) {
        return commentResolvers.getCommentsByPostId(args.postId);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        return userResolvers.addUser(args);
      }
    },
    loginUser: {
      type: AuthPayloadType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        return userResolvers.loginUser(args);
      }
    },
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        author: { type: GraphQLID }
      },
      resolve(parent, args, context) {
        if (!context.user) throw new Error('Unauthorized');
        return postResolvers.addPost(args);
      }
    },
    addComment: {
      type: CommentGraphQLType,
      args: {
        text: { type: GraphQLString },
        postId: { type: GraphQLID }
      },
      resolve(parent, args, context) {
        if (!context.user) throw new Error('Unauthorized');
        return commentResolvers.addComment({ text: args.text, postId: args.postId, author: context.user.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
