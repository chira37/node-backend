const express = require("express");
require("dotenv").config({ path: __dirname + "/env" });
const mongoose = require("mongoose");
const postsRoute = require("./routes/posts");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use("/posts", postsRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("starting port 3000"));

console.log(process.env.DB_CONNECTION);

mongoose
    .connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("connected to databse"))
    .catch((error) => console.log("ERROR:", error));
