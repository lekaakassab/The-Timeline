const express = require("express");
const router = express.Router();

const { homePage } = require("../controller/userController");

router.get("/", homePage);

module.exports = router;