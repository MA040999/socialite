const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const { cloudinary } = require("../utils/cloudinary");
const db = require("../models");
const fs = require("fs");

const createPost = async function (req, res) {
  if (!req.userId) return res.status(400).json({ message: "Unauthenticated" });

  // const uploadFolderPath = "/uploads/";
  try {
    const content = req.body.content;
    const images = req.body.file
      ? Array.isArray(req.body.file)
        ? req.body.file
        : [req.body.file]
      : null;
    const imagePaths = [];

    const promise = images
      ? images.map(async function (image) {
          try {
            const uploadResponse = await cloudinary.uploader.upload(image, {
              upload_preset: "images",
            });
            // let extData = image.name.split(".");
            // let ext = extData[extData.length - 1].toString();
            // let imageUrl = uploadFolderPath + uuidv1() + "." + ext;
            // let uploadPath = process.cwd() + imageUrl;
            // image.mv(uploadPath, function (err) {
            //   if (err) return res.status(500).send(err);

            //   console.log("File uploaded!");
            // });
            imagePaths.push(uploadResponse.secure_url);
          } catch (error) {
            console.log(`error.message`, error.message);
          }
        })
      : [];

    Promise.all(promise).then(async () => {
      const user = await db.Users.findById(req.userId);

      const post = new db.Posts({
        content,
        images: imagePaths,
        creator: req.userId,
        name: user.fullname,
        displayImage: user.displayImage,
      });

      await post.save();
      res.status(201).json(post);
    });
  } catch (error) {
    console.log(`error`, error.message);
    res.status(409).json(error.message);
  }
};

const getPosts = async function (req, res) {
  try {
    const { page } = req.query;
    const LIMIT = 8;
    const maxPages = (await db.Posts.countDocuments()) / LIMIT;
    const skipDocs = (Number(page) - 1) * LIMIT;

    const posts = await db.Posts.find()
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(skipDocs);
    res.status(200).json({ posts, maxPages: Math.ceil(maxPages) });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getPostById = async function (req, res) {
  try {
    const post = await db.Posts.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
};

const updatePost = async function (req, res) {
  try {
    if (!req.userId)
      return res.status(400).json({ message: "Unauthenticated" });

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with this id");

    // const uploadFolderPath = "/uploads/";

    const content = req.body.content;
    const images = req.body.file
      ? Array.isArray(req.body.file)
        ? req.body.file
        : [req.body.file]
      : null;
    const imagePaths = [];

    const promise = images
      ? images.map(async function (image) {
          if (image.substring(0, 5) !== "https") {
            const uploadResponse = await cloudinary.uploader.upload(image, {
              upload_preset: "images",
            });
            // let extData = image.name.split(".");
            // let ext = extData[extData.length - 1].toString();
            // let imageUrl = uploadFolderPath + uuidv1() + "." + ext;
            // let uploadPath = process.cwd() + imageUrl;
            // image.mv(uploadPath, function (err) {
            //   if (err) return res.status(500).send(err);

            //   console.log("File uploaded!");
            // });
            imagePaths.push(uploadResponse.secure_url);
          } else {
            imagePaths.push(image);
          }
        })
      : [];

    Promise.all(promise).then(async () => {
      const updatedPost = await db.Posts.findByIdAndUpdate(
        id,
        { content, images: imagePaths },
        { new: true }
      );

      res
        .status(200)
        .json({ updatedPost, message: "Post updated successfully" });
    });

    // const images = req.body
    //   ? Array.isArray(req.files.file)
    //     ? req.files.file
    //     : [req.files.file]
    //   : null;
    // const imagePaths = [];

    // images
    //   ? await images.forEach(function (image) {
    //       let imageUrl = uploadFolderPath + image.name;
    //       let uploadPath = process.cwd() + imageUrl;
    //       image.mv(uploadPath, function (err) {
    //         if (err) return res.status(500).send(err);

    //         console.log("File uploaded!");
    //       });
    //       imagePaths.push(imageUrl);
    //     })
    //   : "";

    // const updatedPost = await db.Posts.findByIdAndUpdate(
    //   id,
    //   { content, images: imagePaths },
    //   { new: true }
    // );

    // res.status(200).json({ updatedPost, message: "Post updated successfully" });
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

    return res.status(200).json({ message: "Post deleted successfully" });
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

    const user = await db.Users.findById(req.userId);

    const comment = new db.Comments({
      content,
      creator: req.userId,
      name: user.fullname,
      displayImage: user.displayImage,
      postId: id,
    });

    await comment.save();

    const post = await db.Posts.findById(id);

    post.comments.push(comment._id);

    const updatedPost = await db.Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json(error);
  }
};

const fetchComments = async function (req, res) {
  try {
    const commentIds = JSON.parse(req.query.comments);
    const commentsArray = [];

    const promise = commentIds.map(async (id) => {
      commentsArray.push(await db.Comments.findOne({ _id: { $eq: id } }));
    });

    Promise.all(promise).then(() => {
      commentsArray.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      res.status(200).json(commentsArray);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const search = async function (req, res) {
  try {
    const { searchQuery } = req.query;

    const searchTerm = new RegExp(searchQuery, "i");

    const searchedPosts = await db.Posts.find({
      $or: [{ content: searchTerm }, { name: searchTerm }],
    });

    return res.status(200).json(searchedPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
  search,
  fetchComments,
};
