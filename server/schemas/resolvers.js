const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id)
          .select('-password')
          .populate('books');
        return userData;
      } else {
        throw new AuthenticationError('User not logged in.');
      }
    },
  },
};

module.exports = resolvers;
