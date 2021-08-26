const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    user: {
        type: Schema.Type.ObjectId,
        ref: "User",
    },
    caption: String,
    photo: String,
    likes: {
        type: Number,
        default: 0,
    },
    comment: {
        type: Schema.Type.ObjectId,
        ref: "Comment",
    },
    time: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model("Post", PostSchema);

module.export = Post;
