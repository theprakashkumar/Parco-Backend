const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    read: {
        type: Boolean,
        default: false,
    },
    notificationType: {
        type: String,
        enum: ["LIKE", "COMMENT", "FOLLOW"],
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    sourceUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    targetUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    time: {
        type: Date,
        default: Date.now,
    },
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
