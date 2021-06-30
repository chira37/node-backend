const express = require("express");
require("dotenv").config({ path: __dirname + "/env" });
const mongoose = require("mongoose");
const postsRoute = require("./routes/posts");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
require("./auth/auth");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use("/posts", postsRoute);
app.use("/user", userRoute);

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("starting port 3000"));

mongoose
    .connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("connected to databse"))
    .catch((error) => console.log("ERROR:", error));
