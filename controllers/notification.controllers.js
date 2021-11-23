const Notification = require("../models/notification");
const getNotification = async (req, res) => {
    try {
        const userId = req.userId;
        const notification = await Notification.find({
            targetUser: userId,
        }).populate({ path: "sourceUser", select: "name" });
        if (notification) {
            return res.status(200).json({
                success: true,
                notification,
            });
        }

        return res.status(404).json({
            success: false,
            message: "No Notification Found!",
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

module.exports = { getNotification };
