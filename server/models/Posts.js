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
    required: true
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
  images: [String],
});

module.exports = mongoose.model("Post", postSchema);
