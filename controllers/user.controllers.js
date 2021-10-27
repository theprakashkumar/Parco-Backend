const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const getUserSignup = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(409).json({
                success: false,
                message: "User Already Exists!",
            });
        }

        const usernameAlreadyExists = await User.findOne({ username });
        if (usernameAlreadyExists) {
            return res.status(409).json({
                success: false,
                message: "Username Already Exists",
            });
        }

        const newUser = new User({
            name,
            email,
            password,
            username,
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashPassword;

        const createdUser = await newUser.save();
        // After user creation send token and other details so that user can be logged in on front end.

        const token = jwt.sign(
            { userId: createdUser._id },
            process.env.SECRET,
            { expiresIn: "30 days" }
        );
        return res.status(200).json({
            success: true,
            id: createdUser.id,
            email: createdUser.email,
            username: createdUser.username,
            name: createdUser.name,
            token,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: `Can't Create User!`,
            errorMessage: err.message,
        });
    }
};

const getUserLoggedIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email });
        if (foundUser) {
            console.log(foundUser.password, password);
            const passwordMatched = await bcrypt.compare(
                password,
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
                    email: foundUser.email,
                    username: foundUser.username,
                    name: foundUser.name,
                    token,
                });
            }
            return res.status(200).json({
                success: false,
                message: "Wrong Password!",
            });
        }
        return res.status(401).json({
            success: false,
            message: "User Not Found!",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Can't Login the User!",
            errorMessage: err.message,
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const { id: userId } = req.params;

        const foundUser = await User.findById(userId);
        if (foundUser) {
            const populatedUser = await foundUser.populate("post");
            return res.status(200).json({
                success: true,
                user: populatedUser,
            });
        }
        return res.status(404).json({
            success: false,
            message: "User Not Found!",
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Can't Get the User!",
            errorMessage: err.message,
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const user = await User.find({});
        if (user) {
            return res.status(200).json({
                success: true,
                user,
            });
        }
        return res.status(404).json({
            status: false,
            message: "User Not Found!",
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "Can't Get All Users!",
            errorMessage: err.message,
        });
    }
};

// update user

module.exports = { getUserSignup, getUserLoggedIn, getUserProfile, getAllUser };
