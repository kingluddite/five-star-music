exports.typeDefs = `
  type Artist {
   _id: ID
   firstName: String!
   lastName: String
   biography: String
   createdDate: String
  }

  type Song {
   _id: ID
   title: String!
   createdDate: String
   likes: Int
   username: String
  }

  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Song]
  }

  type Query {
    getAllSongs: [Song]
  }

  type Token {
    token: String!
  }

  type Mutation {
    addSong(title: String!, username: String): Song

    signupUser(username: String!, email: String!, password: String!): Token
  }
`;
