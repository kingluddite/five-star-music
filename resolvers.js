const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const { ObjectID } = require("mongoose").mongo.ObjectID;

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  ObjectID: new GraphQLScalarType({
    name: "ObjectID",
    description:
      "The `ObjectID` scalar type represents a [`BSON`](https://en.wikipedia.BSON) commonly used in `mongodb`",
    serialize(_id) {
      if (_id instanceof ObjectID) {
        return _id.toHexString();
      }
      if (typeof _id === "string") {
        return _id;
      }
      throw new Error(
        `${Object.getPrototypeOf(_id).constructor.name} not convertible to `
      );
    },
    parseValue(_id) {
      if (typeof _id === "string") {
        return ObjectID.createFromHexString(_id);
      }
      throw new Error(`${typeof _id} not convertible to ObjectID`);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return ObjectID.createFromHexString(ast.value);
      }
      throw new Error(`${ast.kind} not convertible to ObjectID`);
    }
  }),

  Query: {
    // song queries
    getAllSongs: async (root, args, { Song }) => {
      const allSongs = await Song.find().sort({
        createdDate: "desc"
      });
      return allSongs;
    },

    getSong: async (root, { _id }, { Song }) => {
      const song = await Song.findOne({ _id });
      return song;
    },

    searchSongs: async (root, { searchTerm }, { Song }) => {
      if (searchTerm) {
        // search
        const searchResults = await Song.find(
          {
            $text: { $search: searchTerm }
          },
          {
            score: { $meta: "textScore" }
          }
        ).sort({
          score: { $meta: "textScore" }
        });
        return searchResults;
      }
      const songs = await Song.find().sort({
        likes: "desc",
        createdDate: "desc"
      });
      return songs;
    },

    // user queries

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: "favorites",
        model: "Song"
      });
      return user;
    },

    getUserSongs: async (root, { username }, { Song }) => {
      const userSongs = await Song.find({ username }).sort({
        createdDate: "desc"
      });
      return userSongs;
    }
  },

  Mutation: {
    addSong: async (
      root,
      { title, imageUrl, category, youTubeUrl, description, username },
      { Song }
    ) => {
      const newSong = await new Song({
        title,
        imageUrl,
        category,
        youTubeUrl,
        description,
        username
      }).save();
      return newSong;
    },

    likeSong: async (root, { _id, username }, { Song, User }) => {
      const song = await Song.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
      const user = await User.findOneAndUpdate(
        { username },
        { $addToSet: { favorites: _id } }
      );
      return song;
    },

    unlikeSong: async (root, { _id, username }, { Song, User }) => {
      const song = await Song.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: _id } }
      );
      return song;
    },

    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      // check to make sure password matches with user
      // that is found
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid Password");
      }
      // all good? return token
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      // check if user already exists
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }

      // user doesn't exist, let's create one now!
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },

    updateUserSong: async (
      root,
      { _id, title, imageUrl, category, description },
      { Song }
    ) => {
      const updatedSong = await Song.findOneAndUpdate(
        { _id },
        { $set: { title, imageUrl, category, youTubeUrl, description } },
        { new: true }
      );
      return updatedSong;
    },

    deleteUserSong: async (root, { _id }, { Song }) => {
      const song = await Song.findOneAndRemove({ _id });
      return song;
    }
  }
};
