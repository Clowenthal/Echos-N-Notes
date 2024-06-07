const userController = require('../controllers/userController');

const userResolvers = {
  Query: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => await userController.getUsers(),
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: async (_, { id }) => await userController.getUserById(id),
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const { user, token } = await userController.registerUser(username, email, password);
      return token;
    },
    login: async (_, { email, password }) => {
      const token = await userController.loginUser(email, password);
      return token;
    },
  },
};

module.exports = userResolvers;


