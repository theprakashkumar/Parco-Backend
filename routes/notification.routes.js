const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const { getNotification } = require("../controllers/notification.controllers");

router.use(authenticate);
router.get("/", getNotification);

module.exports = router;
