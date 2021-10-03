const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const {
    newPost,
    getPostById,
    deletePost,
    editPost,
} = require("../controllers/post.controllers");

router.use(authenticate);

router.post("/new", newPost);
// param can be added to get post in req
router.get("/:id", getPostById);
router.delete("/:id", deletePost);
router.put("/:id", editPost);

module.exports = router;
