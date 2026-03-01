const express = require("express");
const router = express.Router();

const {
  homePage,
  addPost,
  deletePost,
  updatePost,
  addComment,
  deleteComment
} = require("../controller/userController");

const apiRoutes = require("./apiRoutes");

router.use(apiRoutes);

router.get("/", homePage);
router.post("/posts", addPost);
router.post("/posts/:id/delete", deletePost);
router.post("/posts/:id/update", updatePost);
router.post("/post/add/new-comment/:id", addComment);
router.post("/comments/:id/delete", deleteComment);

module.exports = router;