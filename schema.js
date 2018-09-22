const { gql } = require("apollo-server-express");

exports.typeDefs = `
  scalar ObjectID

  type Artist {
   _id: ObjectID
   firstName: String!
   lastName: String
   biography: String
   createdDate: String
  }

  type Song {
   _id: ObjectID
   title: String!
   category: String!
   createdDate: String
   likes: Int
   username: String
  }

  type User {
    _id: ObjectID
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Song]
  }

  type Query {
    getAllSongs: [Song]
    getSong(_id: ObjectID!): Song
    searchSongs(searchTerm: String): [Song]

    getCurrentUser: User
    getUserSongs(username: String!): [Song]
  }

  type Token {
    token: String!
  }

  type Mutation {
    addSong(title: String!, category: String!, username: String):Song
    deleteUserSong(_id: ObjectID):Song
    likeSong(_id: ObjectID!, username: String!): Song
    unlikeSong(_id: ObjectID!, username: String!): Song

    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
  }
`;
