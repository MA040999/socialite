const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  displayImage: {
    type: String,
    default: null,
  },
  content: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: [String],
    default: [],
  },
  comments: {
    type: [Object],
    default: [],
  },
  images: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Post", postSchema);
