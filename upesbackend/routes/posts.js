const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");
const cloudinary = require("../config/cloudinary");
const upload = require("../config/multer");
//CREATE
router.post("/create", verifyToken, upload.single("file"), async (req, res) => {
  try {
    const fileStr = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "posts",
    });

    // Add image URL to post body
    const newPost = new Post({
      ...req.body,
      photo: result.secure_url, // assuming your Post model has an 'image' field
    });

    // console.log(req.body)
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyToken, upload.single("file"), async (req, res) => {
  try {
    let updatedData = { ...req.body };

    // If a new file was uploaded
    if (req.file) {
      // Upload the new image to Cloudinary
      const fileStr = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(fileStr, {
        folder: "posts",
      });

      // Add new image URL to updated data
      updatedData.photo = result.secure_url;
    }

    // Update the post with all the data
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("Post has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST DETAILS
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POSTS
router.get("/", async (req, res) => {
  const query = req.query;

  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const posts = await Post.find(query.search ? searchFilter : null);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER POSTS
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
