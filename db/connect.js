const mongoose = require("mongoose");

const connect = () => {
    mongoose
        .connect(
            "mongodb+srv://pk:nkLBJgH7hWt22VHO@cluster0.pehvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
            }
        )
        .then(() => console.log("Connected 🔥"))
        .catch((error) => console.log("Something Went Wrong 😟", error));
};

module.exports = connect;
