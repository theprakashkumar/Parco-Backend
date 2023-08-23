const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: "User Must Have Name",
    },
    email: {
        type: String,
        required: "User Must Have Email",
        unique: [true, "Email Already Exist"],
    },
    username: {
        type: String,
        required: "User Must Have Username",
        unique: [true, "Username Already Exist"],
    },
    password: {
        type: String,
        required: "User Must Have Password",
    },
    post: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    profilePhoto: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "Earth",
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
