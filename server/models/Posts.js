const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  // userID: {
  //   type: String,
  //   required: true,
  // },
  content: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  //   comments: {
  //     type: [],
  //     default: 0,
  //   },
  images: [String],
});

module.exports = mongoose.model("Post", postSchema);
