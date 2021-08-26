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
    password: {
        type: String,
        required: "User Must Have Password",
    },
    post: [
        {
            post: {
                type: Schema.Type.ObjectId,
                ref: "Post",
            },
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
            followers: {
                type: Schema.Type.ObjectId,
                ref: "User",
            },
        },
    ],
    following: [
        {
            following: {
                type: Schema.Type.ObjectId,
                ref: "User",
            },
        },
    ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
