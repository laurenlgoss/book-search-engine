const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../controllers/user-controller');

const resolvers = {
  Query: {
    user: async (parent, { id, username }) => {
      return getSingleUser(id, username);
    },
  },
};

module.exports = resolvers;
