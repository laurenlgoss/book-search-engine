const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBook!): User
  }

  input savedBook {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
`;

module.exports = typeDefs;
