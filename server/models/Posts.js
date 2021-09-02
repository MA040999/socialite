const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  // userID: {
  //   type: String,
  //   required: true,
  // },
  content: {
    type: String,
    required: true,
  },
  createAt: {
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
  images: {
    type: [String],
    required: true,
  }
});

module.exports = mongoose.model("Post", postSchema);
