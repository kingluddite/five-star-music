const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
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
    imageUrl: String!
    category: String!
    youTubeUrl: String
    description: String
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
    # song
    getAllSongs: [Song]
    getSong(_id: ObjectID!): Song
    searchSongs(searchTerm: String): [Song]

    # user
    getCurrentUser: User
    getUserSongs(username: String!): [Song]
  }

  # security
  type Token {
    token: String!
  }

  type Mutation {
    # song
    addSong(
      title: String!
      imageUrl: String!
      category: String!
      youTubeUrl: String
      description: String
      username: String
    ): Song

    likeSong(_id: ObjectID!, username: String!): Song
    unlikeSong(_id: ObjectID!, username: String!): Song

    # user
    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token

    deleteUserSong(_id: ObjectID): Song
    updateUserSong(
      _id: ObjectID!
      title: String!
      imageUrl: String!
      category: String!
      youTubeUrl: String
      description: String
    ): Song
  }
`;
