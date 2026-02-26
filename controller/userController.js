const commentModel = require("../models/commentModel");
const Post = require("../models/userModel");

const homePage = (req, res) =>
  Post.find()
    .sort({ createdAt: -1 })
    .populate("comments", "_id body")
    .then((data) =>
      res.render("homePage", {
        posts: data,
        error: "",
      })
    )
    .catch((err) => {
      console.log(err);
      res.render("homePage", { posts: [], error: "" });
    });

const addPost = (req, res) =>
  Post.create({ post: req.body.post })
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });

const updatePost = (req, res) =>
  Post.findByIdAndUpdate(req.params.id, { post: req.body.post })
    .then(() => res.redirect("/"))
    .catch(() => res.redirect("/"));

const deletePost = (req, res) =>
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/"))
    .catch(() => res.redirect("/"));

const addComment = (req, res) => {
  let postId = req.params.id;

  if (req.body.body !== "" && postId) {
    let commentData = {
      ...req.body,
      post: postId,
    };

    let newComment = new commentModel(commentData);

    newComment
      .save()
      .then(() => {
        Post.findById(postId)
          .then((postInfo) => {
            postInfo.comments.push(newComment._id);

            postInfo
              .save()
              .then(() => res.redirect("/"))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
  } else {
    res.redirect("/");
  }
};

const deleteComment = (req, res) => {
  const commentId = req.params.id;

  commentModel
    .findById(commentId)
    .then((comment) => {
      return Post.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });
    })
    .then(() => commentModel.findByIdAndDelete(commentId))
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
};

module.exports = {
  homePage,
  addPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
};