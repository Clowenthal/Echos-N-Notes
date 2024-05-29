const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userResolvers = {
  getUsers: async () => {
    try {
      return await User.find();
    } catch (err) {
      throw new Error('Error fetching users');
    }
  },
  addUser: async (args) => {
    try {
      const { name, email, password } = args;
      const userExists = await User.findOne({ email });
      if (userExists) throw new Error('User already exists');

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      return user;
    } catch (err) {
      throw new Error('Error adding user');
    }
  },
  loginUser: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Incorrect password');

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    } catch (err) {
      throw new Error('Error logging in');
    }
  }
};

module.exports = userResolvers;

