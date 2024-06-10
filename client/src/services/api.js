import { GraphQLClient } from 'graphql-request';  // Import GraphQLClient

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_ENDPOINT, {  // Create GraphQL client
  headers: {
    'x-auth-token': localStorage.getItem('token') || '',  // Set authorization header with JWT token
  },
});

export const request = (query, variables) => client.request(query, variables);  // Export request function

