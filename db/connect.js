const mongoose = require("mongoose");

const connect = () => {
    mongoose
        .connect(
            process.env.DB,
            {
                useNewUrlParser: true,
            }
        )
        .then(() => console.log("Connected 🔥"))
        .catch((error) => console.log("Something Went Wrong 😟", error));
};

module.exports = connect;
