const express = require("express");
const env = require("dotenv");

const connect = require("./db/connect");

// configure
const app = express();
env.config();
connect();

app.get("/", (req, res) => {
    res.send("Welcome to Parco Backend ");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Has Started ");
});
