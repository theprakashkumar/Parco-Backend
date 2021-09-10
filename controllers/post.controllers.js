const Post = require("../models/post");
const User = require("../models/user");

// ! Here we are find user/post again and again so it would be nice we add router.param to handle for us.
const newPost = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.userId;
        const user = await User.findById(userId);
        if (user) {
            const post = new Post({
                user: userId,
                caption: body.caption,
                photo: body.photo || null,
            });
            const newPost = await post.save();
            const updateUser = user.post.push(newPost);
            await updateUser.save();
        }
        return res.status(201).json({ success: true });
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

module.exports = { newPost, getPost };
