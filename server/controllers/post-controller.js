const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const db = require("../models");
const Comment = require("../models/Comment");
const Posts = require("../models/Posts");

const createPost = async function (req, res) {
  if (!req.userId) return res.status(400).json({ message: "Unauthenticated" });

  const uploadFolderPath = "/uploads/";

  const content = req.body.content;
  const images = req.files
    ? Array.isArray(req.files.file)
      ? req.files.file
      : [req.files.file]
    : null;
  const imagePaths = [];

  images
    ? await images.forEach(function (image) {
        let extData = image.name.split(".");
        let ext = extData[extData.length - 1].toString();
        let imageUrl = uploadFolderPath + uuidv1() + "." + ext;
        let uploadPath = process.cwd() + imageUrl;
        image.mv(uploadPath, function (err) {
          if (err) return res.status(500).send(err);

          console.log("File uploaded!");
        });
        imagePaths.push(imageUrl);
      })
    : "";

  const post = new Posts({
    content,
    images: imagePaths,
    creator: req.userId,
    name: req.fullname,
    displayImage: req.displayImage,
  });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json(error);
  }
};

const getPosts = async function (req, res) {
  try {
    const { page } = req.query
    const LIMIT = 8
    const maxPages = await db.Posts.countDocuments() / LIMIT
    const skipDocs = (Number(page) - 1) * LIMIT

    const posts = await db.Posts.find().sort({ createdAt: -1 }).limit(LIMIT).skip(skipDocs);
    res.status(200).json({posts, maxPages: Math.ceil(maxPages)});
  } catch (error) {
    res.status(404).json(error);
  }
};

const getPostById = async function(req,res){
  try {
    const post = await db.Posts.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json(error);
    
  }
}

const updatePost = async function (req, res) {
  try {
    if (!req.userId)
      return res.status(400).json({ message: "Unauthenticated" });

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with this id");

    const uploadFolderPath = "/uploads/";

    const content = req.body.content;
    const images = req.files
      ? Array.isArray(req.files.file)
        ? req.files.file
        : [req.files.file]
      : null;
    const imagePaths = [];

    images
      ? await images.forEach(function (image) {
          let imageUrl = uploadFolderPath + image.name;
          let uploadPath = process.cwd() + imageUrl;
          image.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);

            console.log("File uploaded!");
          });
          imagePaths.push(imageUrl);
        })
      : "";

    const updatedPost = await db.Posts.findByIdAndUpdate(
      id,
      { content, images: imagePaths },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json(error);
  }
};

const likePost = async function (req, res) {
  try {
    if (!req.userId)
      return res.status(400).json({ message: "Unauthenticated" });

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with this id");

    const post = await db.Posts.findById(id);

    const index = post.likeCount.findIndex((id) => id === req.userId);

    if (index === -1) {
      post.likeCount.push(req.userId);
    } else {
      post.likeCount.splice(index, 1);
    }

    const updatedPost = await db.Posts.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json(error);
  }
};

const deletePost = async function (req, res) {
  try {
    if (!req.userId)
      return res.status(400).json({ message: "Unauthenticated" });

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with this id");

    await db.Posts.findByIdAndRemove(id);

    return res.status(200).json({ message: "Post successfully deleted." });
  } catch (error) {
    res.status(409).json(error);
  }
};

const comment = async function (req, res) {
  try {
    if (!req.userId)
      return res.status(400).json({ message: "Unauthenticated" });

    const { id } = req.params;
    const content = req.body.content;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with this id");

    const comment = new Comment({
      content,
      creator: req.userId,
      name: req.fullname,
      displayImage: req.displayImage,
    });

    const post = await db.Posts.findById(id);

    post.comments.push(comment)

    const updatedPost = await db.Posts.findByIdAndUpdate(id, post, {new: true})

    return res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json(error);
  }
};

const search = async function (req, res) {
  try {
    const { searchQuery } = req.query;


    return res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  likePost,
  deletePost,
  getPostById,
  comment,
  search
};
