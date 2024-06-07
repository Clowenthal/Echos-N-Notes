const { GraphQLError } = require('graphql');  // Import GraphQLError from graphql
const jwt = require('jsonwebtoken');  // Import jwt for token handling

const secret = 'mysecretssshhhhhhh';  // Secret key for JWT
const expiration = '2h';  // Token expiration time

module.exports = {
  // Custom authentication error
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // Function to sign a token with user data
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };  // Create payload with user data
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });  // Sign and return token
  },
};

