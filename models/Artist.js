const mongoose = require("mongoose");

const { Schema } = mongoose;

const ArtistSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  // name: {
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  // },
  biography: String,
  // twitter: {
  //   type: String,
  //   validate: {
  //     validator: function(text) {
  //       return text.indexOf('https://twitter.com/') === 0;
  //     },
  //     message: 'Twitter handle must start with https://twitter.com',
  //   },
  // },
  // profilePicture: Buffer,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Artist", ArtistSchema);
