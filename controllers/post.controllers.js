const Post = require("../models/post");
const User = require("../models/user");

const newPost = async (req, res) => {
    console.log("got the new post request!");
    try {
        const { caption, photo } = req.body;
        const userId = req.userId;
        console.log(userId);
        const user = req.user;
        if (user) {
            const post = new Post({
                user: userId,
                caption,
                photo: photo || null,
            });
            const newPost = await post.save();
            user.post.push(newPost._id);
            const updatedUser = await user.save();
            const populatedUser = await updatedUser.populate("post");
            return res.status(201).json({
                success: true,
                user: populatedUser,
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Can't Create Post!",
            errorMessage: err.message,
        });
    }
};

const getPostById = async (req, res) => {
    try {
        const body = req.body;
        const post = await Post.findById(body.id);
        if (user) {
            return res.send(200).json({
                success: true,
                post: post,
            });
        }
        return res.status(401).json({
            success: false,
            message: "Post Not Found!",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Can't Get the Post!",
            errorMessage: err.message,
        });
    }
};

const getPostByUser = async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findById(body.id);
        if (user) {
            return res.send(200).json({
                success: true,
                post: user.post,
            });
        }
        return res.status(401).json({
            success: false,
            message: "User Not Found!",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Can't Get the Post!",
            errorMessage: err.message,
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findById(body.id);

        user.post = user.post.filter((post) => post._id !== body.post.id);

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Couldn't Delete the Post!",
            errorMessage: err.message,
        });
    }
};

// editPost

module.exports = { newPost };
