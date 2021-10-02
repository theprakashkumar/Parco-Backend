const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const { newPost, getPostById } = require("../controllers/post.controllers");

router.use(authenticate);

router.get("/:id", getPostById);
router.post("/new", newPost);

module.exports = router;
