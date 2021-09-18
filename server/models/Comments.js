const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
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
  postId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
