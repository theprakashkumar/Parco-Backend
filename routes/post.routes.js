const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const { newPost, getPost} = require("../controllers/post.controllers");

router.use(authenticate);
router.get("/", getPost);
router.post("/", newPost);

module.exports = router;
