const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    time: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        require: "You Must Enter Some Text!",
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
