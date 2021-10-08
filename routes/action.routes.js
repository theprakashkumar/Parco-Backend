const express = require("express");
const {
    addComment,
    deleteComment,
} = require("../controllers/comment.controllers");
const { likePost, removeLike } = require("../controllers/like.controllers");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// follow & un-follow
router.use(authenticate);
// like & remove like
router.put("/like/:postId", likePost);
router.delete("/like/:postId", removeLike);

// comment
router.post("/comment/:postId", addComment);
router.delete("/comment/:postId/:commentId", deleteComment);

module.exports = router;
