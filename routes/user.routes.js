const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {
    getUserSignup,
    getUserLoggedIn,
    getUserProfile,
} = require("../controllers/user.controllers");

router.post("/signup", getUserSignup);
router.post("/login", getUserLoggedIn);

router.use(authenticate);
router.get("/:id", getUserProfile);

module.exports = router;
