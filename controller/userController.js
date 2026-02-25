const Post = require("../models/userModel");

const homePage = (req, res) =>
  Post.find()
    .then((posts) => res.render("homePage", { posts: posts || [] }))
    .catch(() => res.render("homePage", { posts: [] }));

    

const addPost = (req, res) =>
  Post.create({ post: req.body.post })
    .then(() => res.redirect("/"))
    .catch(() => res.redirect("/"));

const updatePost = (req, res) =>
  Post.findByIdAndUpdate(req.params.id, { post: req.body.post })
    .then(() => res.redirect("/"))
    .catch(() => res.redirect("/"));

const deletePost = (req, res) =>
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/"))
    .catch(() => res.redirect("/"));

module.exports = { homePage, addPost, updatePost, deletePost };