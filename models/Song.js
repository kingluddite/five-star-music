const mongoose = require("mongoose");

const { Schema } = mongoose;

const SongSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  youTubeUrl: {
    type: String
  },
  description: {
    type: String
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

SongSchema.index({
  "$**": "text"
});

module.exports = mongoose.model("Song", SongSchema);
