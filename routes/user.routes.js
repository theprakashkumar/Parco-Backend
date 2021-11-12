const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {
    getUserSignup,
    getUserLoggedIn,
    getUserProfile,
    getAllUser,
    getUserUpdated,
    initializeUser
} = require("../controllers/user.controllers");

router.post("/signup", getUserSignup);
router.post("/login", getUserLoggedIn);

router.use(authenticate);
router.get("/all", getAllUser);
router.get("/:id", getUserProfile);
router.put("/update/:id/", getUserUpdated);
router.get("/initialize/:id", initializeUser);

//route to update user details

module.exports = router;
