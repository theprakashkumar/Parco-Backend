const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const {
    newPost,
    getPostById,
    deletePost,
} = require("../controllers/post.controllers");

router.use(authenticate);

router.post("/new", newPost);
router.get("/:id", getPostById);
router.delete("/:id", deletePost);

module.exports = router;
