const Post = require("../models/post");
const User = require("../models/user");

const newPost = async (req, res) => {
    try {
        const { caption, photo } = req.body;
        const userId = req.userId;
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
        const { postId } = req.body;
        const post = await Post.findById(postId);
        if (post) {
            // change to only what we need to populate
            const populatedPost = await post.populate({
                path: "user",
                select: "_id, name",
            });
            return res.status(200).json({
                success: true,
                post: populatedPost,
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

const deletePost = async (req, res) => {
    try {
        const user = req.user;
        const postId = req.params.id;
        const isUserPost = user.post.includes(postId);
        if (isUserPost) {
            const deletedPost = await Post.findByIdAndRemove(postId);
            user.post.splice(user.post.indexOf(postId), 1);
            const updatedUser = await user.save();
            return res.status(200).json({
                success: true,
                deletedPost,
                updatedUser,
            });
        }

        return res.status(401).json({
            success: false,
            message: "You are not Authorize!",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Couldn't Delete the Post!",
            errorMessage: err.message,
        });
    }
};

const editPost = async (req, res) => {
    try {
        const user = req.user;
        const body = req.body;
        const postId = req.params.id;
        const isUserPost = user.post.includes(postId);

        if (isUserPost) {
            const post = await Post.findById(postId);
            post.caption = body.caption;
            const updatedPost = await post.save();
            return res.status(200).json({
                success: true,
                updatedPost,
            });
        }
        return res.status(401).json({
            success: false,
            message: "You are not Authorize!",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Couldn't Delete the Post!",
            errorMessage: err.message,
        });
    }
};

module.exports = { newPost, getPostById, deletePost, editPost };
