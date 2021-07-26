const express = require("express");
require("dotenv").config({ path: __dirname + "/env" });
const mongoose = require("mongoose");
const productRoute = require("./routes/product");
const roleRoute = require("./routes/role");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");

const bodyParser = require("body-parser");
const cors = require("cors");
require("./auth/auth");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/role", roleRoute);

app.use(function (err, req, res, next) {
    console.log(err.status);
    res.status(err.status || 500);
    res.json({ success: false, message: err.message, data: {} });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`starting port ${port}`));

mongoose
    .connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("connected to database"))
    .catch((error) => console.log("ERROR:", error));
