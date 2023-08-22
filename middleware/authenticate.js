const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not authorize please login first!",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    // if password is valid put the userId in req
    if (decoded) {
      const user = await User.findById(decoded.userId);
      req.user = user;
      req.userId = decoded.userId;
      next();
    }
    // if password is not valid
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "You are not authorize please login first!",
      error,
    });
  }
};

module.exports = authenticate;
