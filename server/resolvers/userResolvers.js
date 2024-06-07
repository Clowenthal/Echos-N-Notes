const userController = require('../controllers/userController');  // Import userController

const userResolvers = {  // Define user resolvers
  Query: {
    users: async () => await userController.getUsers(),  // Resolver to get all users
    user: async (_, { id }) => await userController.getUserById(id),  // Resolver to get user by ID
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const { user, token } = await userController.registerUser(username, email, password);  // Register user and get token
      return { token };  // Return token
    },
    login: async (_, { email, password }) => {
      const token = await userController.loginUser(email, password);  // Log in user and get token
      return { token };  // Return token
    },
  },
};

module.exports = userResolvers;  // Export user resolvers

