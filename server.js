const express = require("express");
const env = require("dotenv");
var cors = require("cors");

const connect = require("./db/connect");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const actionRouter = require("./routes/action.routes");

// configure
const app = express();
env.config();
app.use(express.json());
app.use(cors());
connect();

app.get("/", (req, res) => {
    res.send("Welcome to Parco Backend ");
});

// Routes
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/action", actionRouter);

app.listen(process.env.PORT || 5050, () => {
    console.log("Server Has Started ");
});
