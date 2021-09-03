const express = require("express");
const env = require("dotenv");

const connect = require("./db/connect");
const userRouter = require("./routes/user.routes")

// configure
const app = express();
env.config();
connect();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Parco Backend ");
});

// Routes
app.use("/user", userRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Has Started ");
});
