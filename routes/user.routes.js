const express = require("express");
const router = express.Router();

const { getUserSignup } = require("../controllers/user.controllers");

router.post("/signup", getUserSignup);

module.exports = router;
