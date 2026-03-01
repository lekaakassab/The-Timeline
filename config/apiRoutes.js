const express = require("express");
const router = express.Router();

const apiController = require("../controller/apiController");

router.get("/api/get-posts", apiController.getAllPosts);
router.post("/api/create-post", apiController.createPost);
router.put("/api/edit-post/:id", apiController.updatePost);
router.delete("/api/delete-post/:id", apiController.deletePost);

router.get("/api/get-post-comments/:postId", apiController.getPostComments);
router.post("/api/post-post-comment/:postId", apiController.createComment);

module.exports = router;