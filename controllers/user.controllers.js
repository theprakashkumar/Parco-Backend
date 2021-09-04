const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const getUserSignup = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const userAlreadyExists = await User.findOne({
            email: body.email,
        });
        if (userAlreadyExists) {
            return res.status(409).json({
                success: false,
                error: "User Already Exists With the Email!",
            });
        }

        const usernameAlreadyExists = await User.findOne({
            username: body.username,
        });
        if (usernameAlreadyExists) {
            return res.status(409).json({
                success: false,
                error: "Username Already Exists",
            });
        }
        const newUser = new User(body);

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashPassword;

        const createdUser = await newUser.save();

        res.status(500).json({
            success: true,
            user: createdUser,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: `Can't Create User!`,
            error: err.message,
        });
    }
};

const getUserLoggedIn = async (req, res) => {
    try {
        const body = req.body;

        const foundUser = await User.findOne({ email: body.email });
        if (foundUser) {
            console.log(foundUser.password, body.password);
            const passwordMatched = await bcrypt.compare(
                body.password,
                foundUser.password
            );
            if (passwordMatched) {
                const token = jwt.sign(
                    { userId: foundUser._id },
                    process.env.SECRET,
                    { expiresIn: "2 days" }
                );
                return res.status(200).json({
                    success: true,
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email,
                    token: token,
                });
            }
            return res.status(200).json({
                success: false,
                message: "Wrong Password!",
            });
        }
        res.status(401).json({
            success: false,
            message: "User Not Found!",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Can't Login the User!",
            error: err.message,
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const body = req.body;

        const foundUser = await User.find({ _id: body.userId });
        if (foundUser) {
            return res.status(200).json({
                success: true,
                foundUser,
            });
        }
        return res.status(404).json({
            success: false,
            message: "User Not Found!",
            error: err.message,
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Can't Get the User!",
            error: err.message,
        });
    }
};

module.exports = { getUserSignup, getUserLoggedIn, getUserProfile };
