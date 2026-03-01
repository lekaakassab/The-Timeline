const mongoose = require("mongoose");
const Post = require("../models/userModel");
const Comment = require("../models/commentModel");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "comments", options: { sort: { createdAt: 1 } } });

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const createPost = async (req, res) => {
  try {
    if (!req.body.post || req.body.post.trim() === "") {
      return res.status(400).json({ message: "Post is required" });
    }

    const newPost = await Post.create({ post: req.body.post });
    return res.status(201).json(newPost);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid post id" });

    if (!req.body.post || req.body.post.trim() === "") {
      return res.status(400).json({ message: "Post is required" });
    }

    const updated = await Post.findByIdAndUpdate(
      id,
      { post: req.body.post },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json(updated);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid post id" });

    const deleted = await Post.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });

    await Comment.deleteMany({ post: id });
    return res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getPostComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    if (!isValidId(postId)) return res.status(400).json({ message: "Invalid post id" });

    const comments = await Comment.find({ post: postId }).sort({ createdAt: 1 });
    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const createComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    if (!isValidId(postId)) return res.status(400).json({ message: "Invalid post id" });

    if (!req.body.body || req.body.body.trim() === "") {
      return res.status(400).json({ message: "Comment body is required" });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = await Comment.create({ body: req.body.body, post: postId });
    post.comments.push(newComment._id);
    await post.save();

    return res.status(201).json(newComment);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPostComments,
  createComment,
};