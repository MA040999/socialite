const { v1: uuidv1 } = require("uuid");
const db = require("../models");
const Posts = require("../models/Posts");

const createPost = async function (req, res) {
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

  const post = new Posts({ content, images: imagePaths });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

const getPosts = async function (req, res) {
  try {
    const posts = await db.Posts.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { createPost, getPosts };
