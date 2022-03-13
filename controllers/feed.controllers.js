const User = require("../models/user");
const Post = require("../models/post");

const feed = async (req, res) => {
    try {
        const user = req.user;
        const userPost = await Post.find({ user: user._id })
            .populate("user")
            .populate({
                path: "comment",
                populate: { path: "user", select: "name username" }
            })
            .exec();
        const followingUserPost = await Post.find({
            user: { $in: user.following },
        })
            .populate("user")
            .populate({
                path: "comment",
                populate: { path: "user", select: "name username" }
            })
            .exec();
        let feed = [...userPost, ...followingUserPost];
        feed = feed.sort((postOne, postTwo) => postTwo.time - postOne.time);
        return res.status(200).json({
            success: true,
            feed,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: "Can't Get the Feed!",
            errorMessage: error.message,
        });
    }
};

module.exports = { feed };
