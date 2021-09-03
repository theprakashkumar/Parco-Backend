const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUserSignup = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const userAlreadyExists = await User.findOne({
            email: body.email,
        });
        if (userAlreadyExists) {
            return res.status(409).json({
                success: false,
                error: "User Already Exists With the Email!",
            });
        }

        const usernameAlreadyExists = await User.findOne({
            username: body.username,
        });
        if (usernameAlreadyExists) {
            return res.status(409).json({
                success: false,
                error: "Username Already Exists",
            });
        }
        const newUser = new User(body);

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashPassword;

        const createdUser = await newUser.save();

        res.status(500).json({
            success: true,
            user: createdUser,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: `Can't Create User!`,
            error: err.message,
        });
    }
};

module.exports = { getUserSignup };
