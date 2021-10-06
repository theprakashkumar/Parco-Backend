const express = require("express");
const {
    addComment,
    deleteComment,
} = require("../controllers/comment.controllers");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// follow & un-follow
// like & remove like
router.use(authenticate);
// comment
router.post("/comment/:postId", addComment);
router.delete("/comment/:postId/:commentId", deleteComment);

module.exports = router;
