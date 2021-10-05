const express = require("express");
const { addComment } = require("../controllers/comment.controllers");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// follow & un-follow
// like & remove like
router.use(authenticate);
// comment
router.post("/comment/:postId", addComment);

module.exports = router;
