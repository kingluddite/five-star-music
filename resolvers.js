const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllSongs: async (root, args, { Song }) => {
      const allSongs = await Song.find();
      return allSongs;
    }
  },

  Mutation: {
    addSong: async (root, { title, username }, { Song }) => {
      const newSong = await new Song({
        title,
        username
      }).save();
      return Song;
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
    }
  }
};
