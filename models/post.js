const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    caption: {
        type: String,
        required: true,
    },
    photo: String,
    likes: {
        type: Number,
        default: 0,
    },
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: [],
        },
    ],
    time: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
