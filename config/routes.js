const express = require("express");
const router = express.Router();

const { homePage, addPost, deletePost, updatePost } = require("../controller/userController");

router.get("/", homePage);
router.post("/posts", addPost);
router.post("/posts/:id/delete", deletePost);
router.post("/posts/:id/update", updatePost);
module.exports = router;