const { GraphQLSchema, GraphQLObjectType } = require('graphql');  // Import GraphQL schema and object types
const resolvers = require('../resolvers');  // Import resolvers
const { TokenType } = require('./types');  // Import TokenType

const RootQuery = new GraphQLObjectType({  // Define root query type
  name: 'RootQueryType',
  fields: resolvers.Query,  // Add resolver queries as fields
});

const Mutation = new GraphQLObjectType({  // Define mutation type
  name: 'Mutation',
  fields: {
    ...resolvers.Mutation,
    register: {
      type: TokenType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: resolvers.Mutation.register,
    },
    login: {
      type: TokenType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: resolvers.Mutation.login,
    },
  },
});

module.exports = new GraphQLSchema({  // Export GraphQL schema
  query: RootQuery,
  mutation: Mutation,
});
