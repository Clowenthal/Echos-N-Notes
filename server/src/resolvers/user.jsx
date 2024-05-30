const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const resolvers = {
  Query: {
    getUsers: async () => await User.find(),
    getUser: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('User already exists');
      }

      const newUser = new User({
        username,
        email,
        password,
      });

      const res = await newUser.save();
      const token = jwt.sign(
        { id: res.id, email: res.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      ...user._doc,
      id: user._id,
      token,
    };
  },
},
};

module.exports = resolvers;

