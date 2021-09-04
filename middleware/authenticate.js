const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You are not authorize please login first!",
        });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    // if password is valid
    if (decoded) {
        req.userId = decoded.userId;
        next();
        // if password is not valid
    } else {
        return res.status(401).json({
            success: false,
            message: "You are not authorize please login first!",
        });
    }
};

module.exports = authenticate;
