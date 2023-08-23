const express = require("express");
const {
    addComment,
    deleteComment,
} = require("../controllers/comment.controllers");
const { follow, unfollow } = require("../controllers/follow.controllers");
const { likePost, removeLike } = require("../controllers/like.controllers");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.use(authenticate);
// follow & un-follow
router.put("/follow/:followUserId", follow);
router.delete("/unfollow/:unFollowUserId", unfollow);

// like & remove like
router.put("/like/:postId", likePost);
router.delete("/like/:postId", removeLike);

// comment
router.put("/comment/:postId", addComment);
router.delete("/comment/:postId/:commentId", deleteComment);

module.exports = router;
