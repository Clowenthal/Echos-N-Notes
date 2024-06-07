const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { UserType } = require('./types');
const userResolvers = require('../resolvers/userResolvers');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: userResolvers.Query.users,
    user: userResolvers.Query.user,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: userResolvers.Mutation.register,
    login: userResolvers.Mutation.login,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
