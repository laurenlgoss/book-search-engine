const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const { User } = require('../models');

const resolvers = {
  Query: {
    // Return user data if logged in
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id)
          .select('-__v -password') // Exclude '__v' and 'password' fields
          .populate('books');

        return userData;
      } else {
        throw new AuthenticationError('User not logged in.');
      }
    },
  },
  Mutation: {
    // Generate token if user credentials are correct
    login: async (parent, { email, password }) => {
      const userData = await User.findOne({ email });

      if (!userData) {
        throw new AuthenticationError('Incorrect credentials.');
      }

      const isCorrectPassword = await userData.isCorrectPassword(password);

      if (!isCorrectPassword) {
        throw new AuthenticationError('Incorrect credentials.');
      }

      const token = signToken(userData);

      return { token, userData };
    },
  },
};

module.exports = resolvers;
