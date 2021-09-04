const express = require("express");
const router = express.Router();

const {
    getUserSignup,
    getUserLoggedIn,
} = require("../controllers/user.controllers");

router.post("/signup", getUserSignup);
router.post("/login", getUserLoggedIn);

module.exports = router;
