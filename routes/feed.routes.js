const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const { feed } = require("../controllers/feed.controllers");

router.use(authenticate);
router.get("/", feed);

module.exports = router;
