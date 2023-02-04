const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const { urlencoded } = require("express");

const getUserSignup = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(409).json({
                success: false,
                message: "Email Already Exists!",
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
            user: createdUser,
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
                    { expiresIn: "30 days" }
                );
                console.log(foundUser);
                return res.status(200).json({
                    success: true,
                    id: foundUser.id,
                    user: foundUser,
                    token,
                });
            }
            return res.status(401).json({
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
            const post = await Post.find({ user: userId }).populate({
                path: "comment",
                populate: { path: "user", select: "name username" },
            });
            const sortedPost = post.sort((postOne, postTwo) => {
                return postTwo.time - postOne.time;
            });
            return res.status(200).json({
                success: true,
                user: populatedUser,
                post: sortedPost,
            });
        }
        return res.status(404).json({
            success: false,
            message: "User Not Found!",
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
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
            success: false,
            message: "User Not Found!",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Can't Get All Users!",
            errorMessage: err.message,
        });
    }
};

const getUserUpdated = async (req, res) => {
    try {
        const loggedInUserId = req.userId;
        const { id: userId } = req.params;
        const user = await User.findById(userId);
        const updates = Object.entries(req.body);

        if (loggedInUserId === userId) {
            // before updating the user first check if they also want to change the username because if they request for username change then we have to check if username exist or not?
            if (req.body.username === user.username) {
                for (let update of updates) {
                    console.log(update);
                    user[update[0]] = update[1];
                }
                const updatedUser = await user.save();
                return res.status(200).json({
                    success: true,
                    user: updatedUser,
                });
            } else {
                console.log("else ran");
                // run when user want to change the username because in that case we have check if username available or not
                const usernameAlreadyExists = await User.findOne({
                    username: req.body.username,
                });
                console.log(usernameAlreadyExists);
                if (!usernameAlreadyExists) {
                    console.log("no username found");
                    for (let update of updates) {
                        console.log(update);
                        user[update[0]] = update[1];
                    }
                    const updatedUser = await user.save();
                    return res.status(200).json({
                        success: true,
                        user: updatedUser,
                    });
                } else {
                    console.log("username found");
                    return res.status(409).json({
                        success: false,
                        message: "Username Already Exists",
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Can't Update User!",
            errorMessage: err.message,
        });
    }
};

// change password

const initializeUser = async (req, res) => {
    try {
        const loggedInUserId = req.userId;
        const userId = req.params.id;
        if (loggedInUserId === userId) {
            return res.status(200).json({
                success: true,
                user: req.user,
            });
        }
        return res.status(201).json({
            success: false,
            message: "You are not authorize",
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Can't Initialize the User!",
            errorMessage: err.message,
        });
    }
};

module.exports = {
    getUserSignup,
    getUserLoggedIn,
    getUserProfile,
    getAllUser,
    getUserUpdated,
    initializeUser,
};
