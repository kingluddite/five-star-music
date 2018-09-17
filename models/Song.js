const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  // artist: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Author',
  // },
  createdDate: {
    type: Date,
    default: Date.now
  },
  // thumbnail: Buffer,
  // ratings: [
  //   {
  //     summary: String,
  //     detail: String,
  //     numberOfStars: Number,
  //     created: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ],
  likes: {
    type: Number,
    default: 0
  },
  username: {
    type: String
  }
});

module.exports = mongoose.model("Song", SongSchema);
